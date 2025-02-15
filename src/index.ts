interface RoundNumberOptions extends Intl.NumberFormatOptions {
	roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
	wrapped?: boolean;
	wrappedSymbol?: string;
	digitized?: boolean;
	digitizedSymbol?: string;
	useAliases?: boolean;
	aliases?: { [key: string]: string };
	useCustomCurrency?: boolean;
	customCurrency?: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } };
}

class ExchNumberFormat {
	version: string = '1.1.4';
	private replacer: string = 'XYZ';
	private formatter!: Intl.NumberFormat;
	private intlOptions: RoundNumberOptions;
	private customCurrencyData: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } };
	private totalCurrencyData: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } } = {};
	private originalCurrency: string | undefined;
	private totalAliases: { [key: string]: string } = {};
	private internalAliases: { [key: string]: string } = {};

	constructor(locales?: string | undefined, options: RoundNumberOptions = {}) {
		// Custom currency data
		// Cannot be the duplicate of the ISO 4217 currency code and `replacer` is reserved for replacements
		this.customCurrencyData = {
			'ADA': {
				'symbol': '₳',
				'narrowSymbol': '₳',
				'code': 'ADA',
				'name': 'Cardano',
				'defaultDecimals': 2,
			},
			'BCH': {
				'symbol': 'Ƀ',
				'narrowSymbol': 'Ƀ',
				'code': 'BCH',
				'name': 'BitcoinCash',
				'defaultDecimals': 4,
			},
			'BTC': {
				'symbol': '₿',
				'narrowSymbol': '₿',
				'code': 'BTC',
				'name': 'Bitcoin',
				'defaultDecimals': 8,
			},
			'CTN': {
				'symbol': 'Ƈ',
				'narrowSymbol': 'Ƈ',
				'code': 'CTN',
				'name': 'CoreToken',
				'defaultDecimals': 2,
			},
			'CHFX': {
				'symbol': '₣X',
				'narrowSymbol': '₣X',
				'code': 'CHFX',
				'name': 'Swiss Franc X',
				'defaultDecimals': 2,
			},
			'DOT': {
				'symbol': '•',
				'narrowSymbol': '•',
				'code': 'DOT',
				'name': 'Polkadot',
				'defaultDecimals': 2,
			},
			'ETC': {
				'symbol': 'ξ',
				'narrowSymbol': 'ξ',
				'code': 'ETC',
				'name': 'EthereumClassic',
				'defaultDecimals': 3,
			},
			'ETH': {
				'symbol': 'Ξ',
				'narrowSymbol': 'Ξ',
				'code': 'ETH',
				'name': 'Ethereum',
				'defaultDecimals': 4,
			},
			'EURC': {
				'symbol': '€C',
				'narrowSymbol': '€C',
				'code': 'EURC',
				'name': 'Euro Coin',
				'defaultDecimals': 2,
			},
			'EURX': {
				'symbol': '€X',
				'narrowSymbol': '€X',
				'code': 'EURX',
				'name': 'Euro X',
				'defaultDecimals': 2,
			},
			'LTC': {
				'symbol': 'Ł',
				'narrowSymbol': 'Ł',
				'code': 'LTC',
				'name': 'Litecoin',
				'defaultDecimals': 3,
			},
			'SOL': {
				'symbol': '◎',
				'narrowSymbol': '◎',
				'code': 'SOL',
				'name': 'Solana',
				'defaultDecimals': 2,
			},
			'TRX': {
				'symbol': 'TRX',
				'narrowSymbol': 'TRX',
				'code': 'TRX',
				'name': 'Tron',
				'defaultDecimals': 2,
			},
			'USDC': {
				'symbol': '$C',
				'narrowSymbol': '$C',
				'code': 'USDC',
				'name': 'US Dollar Coin',
				'defaultDecimals': 2,
			},
			'USDT': {
				'symbol': '₮',
				'narrowSymbol': '₮',
				'code': 'USDT',
				'name': 'US Tether Dollar',
				'defaultDecimals': 2,
			},
			'USDX': {
				'symbol': '$X',
				'narrowSymbol': '$X',
				'code': 'USDX',
				'name': 'US X Dollar',
				'defaultDecimals': 2,
			},
			'XAB': {
				'symbol': '₡t',
				'narrowSymbol': '₡t',
				'code': 'XAB',
				'name': 'Core Testnet',
				'defaultDecimals': 3,
			},
			'XCB': {
				'symbol': '₡',
				'narrowSymbol': '₡',
				'code': 'XCB',
				'name': 'Core',
				'defaultDecimals': 3,
			},
			'XCE': {
				'symbol': '₡e',
				'narrowSymbol': '₡e',
				'code': 'XCE',
				'name': 'Core Enterprise',
				'defaultDecimals': 3,
			},
			'XMR': {
				'symbol': 'ɱ',
				'narrowSymbol': 'ɱ',
				'code': 'XMR',
				'name': 'Monero',
				'defaultDecimals': 3,
			},
			'XRP': {
				'symbol': 'XRP',
				'narrowSymbol': 'XRP',
				'code': 'XRP',
				'name': 'Ripple',
				'defaultDecimals': 2,
			},
			// Unknown currency
			// Special handling for unknown currency
			'XXX': {
				'symbol': '¤',
				'narrowSymbol': '¤',
				'code': 'XXX',
				'name': 'Unknown',
				'defaultDecimals': 2,
			},
			// Commodities
			'XAU': {
				'symbol': 'Au',
				'narrowSymbol': 'Au',
				'code': 'XAU',
				'name': 'Gold',
				'defaultDecimals': 6,
			},
			'XAG': {
				'symbol': 'Ag',
				'narrowSymbol': 'Ag',
				'code': 'XAG',
				'name': 'Silver',
				'defaultDecimals': 6,
			},
			'XCU': {
				'symbol': 'Cu',
				'narrowSymbol': 'Cu',
				'code': 'XCU',
				'name': 'Copper',
				'defaultDecimals': 2,
			},
		};

		this.internalAliases = {};

		// Default options
		const defaultOptions: RoundNumberOptions = {
			localeMatcher: 'best fit',
			style: 'currency',
			currency: undefined,
			currencyDisplay: 'symbol',
			// @ts-ignore
			roundFunction: 'floor', // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingmode
			useGrouping: true,
			notation: 'standard',
			compactDisplay: 'short',
			wrapped: false,
			wrappedSymbol: 'w',
			digitized: false,
			digitizedSymbol: 'd',
			useAliases: true,
			aliases: {},
			useCustomCurrency: true,
			customCurrency: {},
		};

		// Merge user-defined options with default options
		this.intlOptions = { ...defaultOptions, ...options };
		this.totalAliases = { ...this.intlOptions.aliases, ...this.internalAliases };

		if (this.intlOptions.useCustomCurrency) {
			this.totalCurrencyData = { ...this.customCurrencyData, ...this.intlOptions.customCurrency };
		} else {
			this.totalCurrencyData = {};
		}

		this.originalCurrency = this.intlOptions.currency;

		if (this.intlOptions.useAliases && this.originalCurrency && this.totalAliases[this.originalCurrency]) {
			this.originalCurrency = this.totalAliases[this.originalCurrency];
		}

		// Determine the locale
		let setLocale: string | undefined = locales === 'auto' ? this.determineLocale() : locales;

		const currencyData = this.totalCurrencyData[this.originalCurrency?.toUpperCase() || ''];
		if (this.originalCurrency && currencyData) {
			// It's a custom/extended currency
			this.intlOptions.currency = this.replacer; // Special reserved handler for custom currency
			this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
		}

		try {
			if(this.intlOptions.currency) {
				this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
			} else {
				this.useDecimalStyle();
				this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
			}
		} catch (error) {
			if (error instanceof RangeError) {
				this.useDecimalStyle();
				this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
			} else {
				console.error("Error creating Intl.NumberFormat instance");
				return;
			}
		}
	}

	format(number: number): string {
		let formatted = this.formatter.format(number);
		return this.replaceCurrency(formatted);
	}

	formatToParts(number: number): Intl.NumberFormatPart[] {
		const parts = this.formatter.formatToParts(number);

		if (this.originalCurrency && this.totalCurrencyData[this.originalCurrency.toUpperCase()]) {
			const currencyData = this.totalCurrencyData[this.originalCurrency.toUpperCase()];
			parts.forEach(part => {
				if (part.type === 'currency') {
					part.value = part.value.replace(this.replacer, this.addType(currencyData.symbol));
				}
			});
		} else if (this.originalCurrency) {
			parts.forEach(part => {
				if (part.type === 'currency') {
					part.value = this.addType(part.value);
				}
			});
		}

		return parts;
	}

	isCurrencySupported(currency: string): boolean {
		try {
			new Intl.NumberFormat(undefined, { style: 'currency', currency: currency.toUpperCase() });
			return true;
		} catch (error) {
			if (error instanceof RangeError) {
				return false;
			} else {
				console.warn("Error creating Intl.NumberFormat instance");
				return false;
			}
		}
	}

	private replaceCurrency(input: string): string {
		// Check if a custom currency is being used
		if (this.originalCurrency && this.totalCurrencyData[this.originalCurrency.toUpperCase()]) {
			const currencyData = this.totalCurrencyData[this.originalCurrency.toUpperCase()];
			// Determine what symbol to replace `replacer` with based on the currencyDisplay option
			let replacementValue;
			switch (this.intlOptions.currencyDisplay) {
				case 'narrowSymbol':
					replacementValue = this.addType(currencyData.narrowSymbol);
					break;
				case 'code':
					replacementValue = this.addType(currencyData.code);
					break;
				case 'name':
					replacementValue =  this.addType(currencyData.name);
					break;
				default:
					replacementValue =  this.addType(currencyData.symbol);
					break;
			}
			// Use the determined replacement value for `replacer`
			return input.replace(this.replacer, replacementValue);
		} else if (this.originalCurrency) {
			switch (this.intlOptions.currencyDisplay) {
				case 'narrowSymbol':
					input = this.addType(input);
					break;
				case 'code':
					input = input.replace(this.originalCurrency, this.addType(this.originalCurrency));
					break;
				case 'name':
					input =  this.addType(input);
					break;
				default:
					input =  this.addType(input);
					break;
			}
			return input;
		}
		// If not a custom currency or no need for replacement/addition, return the original formatted string
		return input;
	}

	private useDecimalStyle(): void {
		this.intlOptions.style = 'decimal';
		this.intlOptions.minimumFractionDigits = this.intlOptions.minimumFractionDigits !== undefined ? this.intlOptions.minimumFractionDigits : 2;
		this.intlOptions.maximumFractionDigits = this.intlOptions.maximumFractionDigits !== undefined ? this.intlOptions.maximumFractionDigits : 2;
		delete this.intlOptions.currency;
	}

	private determineLocale(): string {
		if (typeof window !== 'undefined' && navigator.languages && navigator.languages.length) {
			return navigator.languages[0];
		} else if (typeof window !== 'undefined' && navigator.language) {
			return navigator.language;
		}
		return 'en';
	}

	private addType(value: string): string {
		let output = value;
		if (this.intlOptions.digitized) {
			output = this.intlOptions.digitizedSymbol + output;
		}
		if (this.intlOptions.wrapped) {
			output = this.intlOptions.wrappedSymbol + output;
		}
		return output;
	}
}

export default ExchNumberFormat;

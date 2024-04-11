interface RoundNumberOptions extends Intl.NumberFormatOptions {
	roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
	wrapped?: boolean;
	wrappedSymbol?: string;
	digitalized?: boolean;
	digitalizedSymbol?: string;
	useAliases?: boolean;
}

class ExchNumberFormat {
	version: string = '1.1.0';
	private formatter: Intl.NumberFormat;
	private intlOptions: RoundNumberOptions;
	private customCurrencyData: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } };
	private aliases: { [key: string]: string };
	private originalCurrency: string | undefined;

	constructor(locales: string | undefined, options: RoundNumberOptions = {}) {
		// Custom currency data
		// Cannot be the duplicate of the ISO 4217 currency code and 'XYZ' is reserved for replacements
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
			'LTC': {
				'symbol': 'Ł',
				'narrowSymbol': 'Ł',
				'code': 'LTC',
				'name': 'Litecoin',
				'defaultDecimals': 3,
			},
			'SOL': {
				'symbol': 'S◎L',
				'narrowSymbol': 'S◎L',
				'code': 'SOL',
				'name': 'Solana',
				'defaultDecimals': 2,
			},
			'TRX': {
				'symbol': '₵',
				'narrowSymbol': '₵',
				'code': 'TRX',
				'name': 'Tron',
				'defaultDecimals': 2,
			},
			'USDC': {
				'symbol': 'Ⓢ',
				'narrowSymbol': 'USⓈ',
				'code': 'USDC',
				'name': 'USD Coin',
				'defaultDecimals': 2,
			},
			'USDT': {
				'symbol': '₮',
				'narrowSymbol': 'US₮',
				'code': 'USDT',
				'name': 'Tether',
				'defaultDecimals': 2,
			},
			'XCB': {
				'symbol': '₡',
				'narrowSymbol': '₡',
				'code': 'XCB',
				'name': 'Core',
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
				'symbol': '✕',
				'narrowSymbol': '✕',
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
		};

		this.aliases = {};

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
			digitalized: false,
			digitalizedSymbol: 'd',
			useAliases: true,
		};

		// Merge user-defined options with default options
		this.intlOptions = { ...defaultOptions, ...options };
		this.originalCurrency = this.intlOptions.currency;
		if (this.intlOptions.useAliases && this.originalCurrency && this.aliases[this.originalCurrency]) {
			this.originalCurrency = this.aliases[this.originalCurrency];
		}

		// Determine the locale
		let setLocale: string | undefined = locales === 'auto' ? this.determineLocale() : locales;

		const currencyData = this.customCurrencyData[this.originalCurrency?.toUpperCase() || ''];
		if (this.originalCurrency && currencyData) {
			// It's a custom/extended currency
			this.intlOptions.currency = 'XYZ'; // Special reserved handler for custom currency
			this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
		} else if (this.originalCurrency) {
			// It's a recognized ISO currency, or the custom handling isn't required
			// Ensure Intl.NumberFormat will handle this without defaulting to decimal style
			this.intlOptions.style = 'currency';
		} else {
			// No currency provided, use decimal style
			this.useDecimalStyle();
		}

		// Create an Intl.NumberFormat instance
		this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
	}

	format(number: number): string {
		let formatted = this.formatter.format(number);
		return this.replaceCurrency(formatted);
	}

	formatToParts(number: number): Intl.NumberFormatPart[] {
		const parts = this.formatter.formatToParts(number);

		if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
			const originalCurrency = this.originalCurrency.toUpperCase();
			const currencyData = this.customCurrencyData[originalCurrency];
			let symbolToReplace = this.addType(currencyData.symbol);

			switch (this.intlOptions.currencyDisplay) {
				case 'narrowSymbol':
					symbolToReplace = this.addType(currencyData.narrowSymbol);
					break;
				case 'code':
					symbolToReplace = this.addType(currencyData.code);
					break;
				case 'name':
					symbolToReplace = this.addType(currencyData.name);
					break;
			}

			parts.forEach(part => {
				if (part.type === 'currency') {
					part.value = symbolToReplace;
				}
			});
		}

		return parts;
	}

	private replaceCurrency(formattedString: string): string {
		// Check if a custom currency is being used
		if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
			const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
			// Determine what symbol to replace 'XYZ' with based on the currencyDisplay option
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
			// Use the determined replacement value for 'XYZ'
			return formattedString.replace('XYZ', replacementValue);
		}
		// If not a custom currency or no need for replacement, return the original formatted string
		return formattedString;
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
		if (this.intlOptions.digitalized) {
			output = this.intlOptions.digitalizedSymbol + output;
		}
		if (this.intlOptions.wrapped) {
			output = this.intlOptions.wrappedSymbol + output;
		}
		return output;
	}
}

export default ExchNumberFormat;

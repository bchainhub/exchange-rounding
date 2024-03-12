interface RoundNumberOptions extends Intl.NumberFormatOptions {
	roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
}

class ExchNumberFormat {
	private formatter: Intl.NumberFormat;
	private intlOptions: RoundNumberOptions;
	private customCurrencyData: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } };
	private originalCurrency: string | undefined;

	constructor(locales: string, options: RoundNumberOptions = {}) {
		// Custom currency data
		this.customCurrencyData = {
			'BCH': {
				'symbol': 'Ƀ',
				'narrowSymbol': 'BCHɃ',
				'code': 'BCH',
				'name': 'BitcoinCash',
				'defaultDecimals': 4,
			},
			'BTC': {
				'symbol': '₿',
				'narrowSymbol': 'BTC₿',
				'code': 'BTC',
				'name': 'Bitcoin',
				'defaultDecimals': 8,
			},
			'CTN': {
				'symbol': 'Ƈ',
				'narrowSymbol': 'CTNƇ',
				'code': 'CTN',
				'name': 'CoreToken',
				'defaultDecimals': 2,
			},
			'ETH': {
				'symbol': 'Ξ',
				'narrowSymbol': 'ETHΞ',
				'code': 'ETH',
				'name': 'Ethereum',
				'defaultDecimals': 4,
			},
			'LTC': {
				'symbol': 'Ł',
				'narrowSymbol': 'LTCŁ',
				'code': 'LTC',
				'name': 'Litecoin',
				'defaultDecimals': 4,
			},
			'USC': {
				'symbol': 'Ⓢ',
				'narrowSymbol': 'USDCⓈ',
				'code': 'USDC',
				'name': 'USD Coin',
				'defaultDecimals': 2,
			},
			'UST': {
				'symbol': '₮',
				'narrowSymbol': 'USDT₮',
				'code': 'USDT',
				'name': 'Tether',
				'defaultDecimals': 2,
			},
			'XCB': {
				'symbol': '₡',
				'narrowSymbol': 'XCB₡',
				'code': 'XCB',
				'name': 'Core',
				'defaultDecimals': 4,
			},
			'XMR': {
				'symbol': 'ɱ',
				'narrowSymbol': 'XMRɱ',
				'code': 'XMR',
				'name': 'Monero',
				'defaultDecimals': 4,
			},
			'XRP': {
				'symbol': '✕',
				'narrowSymbol': 'XRP✕',
				'code': 'XRP',
				'name': 'Ripple',
				'defaultDecimals': 2,
			},
		};

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
		};

		// Merge user-defined options with default options
		this.intlOptions = { ...defaultOptions, ...options };
		this.originalCurrency = this.intlOptions.currency;

		// Determine the locale
		let setLocale: string;
		if (locales === 'auto') {
			// Check if running in a browser environment
			if (typeof window !== 'undefined' && navigator.languages && navigator.languages.length) {
				setLocale = navigator.languages[0];
			} else if (typeof window !== 'undefined' && navigator.language) {
				setLocale = navigator.language;
			} else {
				setLocale = 'en'; // Default to 'en' or any other default locale
			}
		} else {
			setLocale = locales;
		}

		if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
			const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
			this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
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
			let symbolToReplace = currencyData.symbol;

			switch (this.intlOptions.currencyDisplay) {
				case 'narrowSymbol':
					symbolToReplace = currencyData.narrowSymbol;
					break;
				case 'code':
					symbolToReplace = currencyData.code;
					break;
				case 'name':
					symbolToReplace = currencyData.name;
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
		if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
			const originalCurrency = this.originalCurrency.toUpperCase();
			const currencyData = this.customCurrencyData[originalCurrency];
			let symbolToReplace = currencyData.symbol;
			switch (this.intlOptions.currencyDisplay) {
				case 'narrowSymbol':
					symbolToReplace = currencyData.narrowSymbol;
					break;
				case 'code':
					symbolToReplace = currencyData.code;
					break;
				case 'name':
					symbolToReplace = currencyData.name;
					break;
			}
			return formattedString.replace(originalCurrency, symbolToReplace);
		}
		return formattedString;
	}
}

export default ExchNumberFormat;

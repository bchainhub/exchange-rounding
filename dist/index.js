class ExchNumberFormat {
    constructor(locales, options = {}) {
        // Custom currency data
        this.customCurrencyData = {
            'BCH': {
                'symbol': 'Ƀ',
                'narrowSymbol': 'BCHɃ',
                'code': 'BCH',
                'name': 'BitcoinCash',
                'defaultDecimals': 8,
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
                'defaultDecimals': 8,
            },
            'LTC': {
                'symbol': 'Ł',
                'narrowSymbol': 'LTCŁ',
                'code': 'LTC',
                'name': 'Litecoin',
                'defaultDecimals': 8,
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
                'defaultDecimals': 8,
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
        const defaultOptions = {
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
        let setLocale = locales === 'auto' ? (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language) : locales;
        if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
            this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
        }
        // Create an Intl.NumberFormat instance
        this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
    }
    format(number) {
        let formatted = this.formatter.format(number);
        return this.replaceCurrency(formatted);
    }
    formatToParts(number) {
        const parts = this.formatter.formatToParts(number);
        if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
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
    replaceCurrency(formattedString) {
        if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
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
            return formattedString.replace(this.originalCurrency, symbolToReplace);
        }
        return formattedString;
    }
}
export default ExchNumberFormat;

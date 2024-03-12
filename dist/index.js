class ExchNumberFormat {
    constructor(locales, options = {}) {
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
                'defaultDecimals': 6,
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
        const defaultOptions = {
            localeMatcher: 'best fit',
            style: 'currency',
            currency: undefined,
            currencyDisplay: 'symbol',
            roundFunction: 'floor',
            useGrouping: true,
            notation: 'standard',
            compactDisplay: 'short',
        };
        this.intlOptions = { ...defaultOptions, ...options };
        this.originalCurrency = this.intlOptions.currency;
        let setLocale;
        if (locales === 'auto') {
            if (typeof window !== 'undefined' && navigator.languages && navigator.languages.length) {
                setLocale = navigator.languages[0];
            }
            else if (typeof window !== 'undefined' && navigator.language) {
                setLocale = navigator.language;
            }
            else {
                setLocale = 'en';
            }
        }
        else {
            setLocale = locales;
        }
        if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
            this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
        }
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

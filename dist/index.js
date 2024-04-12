class ExchNumberFormat {
    constructor(locales, options = {}) {
        this.version = '1.1.1';
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
            'XXX': {
                'symbol': '¤',
                'narrowSymbol': '¤',
                'code': 'XXX',
                'name': 'Unknown',
                'defaultDecimals': 2,
            },
        };
        this.aliases = {};
        const defaultOptions = {
            localeMatcher: 'best fit',
            style: 'currency',
            currency: undefined,
            currencyDisplay: 'symbol',
            roundFunction: 'floor',
            useGrouping: true,
            notation: 'standard',
            compactDisplay: 'short',
            wrapped: false,
            wrappedSymbol: 'w',
            digitized: false,
            digitizedSymbol: 'd',
            useAliases: true,
        };
        this.intlOptions = { ...defaultOptions, ...options };
        this.originalCurrency = this.intlOptions.currency;
        if (this.intlOptions.useAliases && this.originalCurrency && this.aliases[this.originalCurrency]) {
            this.originalCurrency = this.aliases[this.originalCurrency];
        }
        let setLocale = locales === 'auto' ? this.determineLocale() : locales;
        const currencyData = this.customCurrencyData[this.originalCurrency?.toUpperCase() || ''];
        if (this.originalCurrency && currencyData) {
            this.intlOptions.currency = 'XYZ';
            this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
        }
        try {
            this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
        }
        catch (error) {
            if (error instanceof RangeError) {
                this.useDecimalStyle();
                this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
            }
            else {
                console.error("Error creating Intl.NumberFormat instance");
            }
        }
    }
    format(number) {
        let formatted = this.formatter.format(number);
        return this.replaceCurrency(formatted);
    }
    formatToParts(number) {
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
    isCurrencySupported(currency) {
        try {
            new Intl.NumberFormat(undefined, { style: 'currency', currency: currency.toUpperCase() });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    replaceCurrency(formattedString) {
        if (this.originalCurrency && this.customCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.customCurrencyData[this.originalCurrency.toUpperCase()];
            let replacementValue;
            switch (this.intlOptions.currencyDisplay) {
                case 'narrowSymbol':
                    replacementValue = this.addType(currencyData.narrowSymbol);
                    break;
                case 'code':
                    replacementValue = this.addType(currencyData.code);
                    break;
                case 'name':
                    replacementValue = this.addType(currencyData.name);
                    break;
                default:
                    replacementValue = this.addType(currencyData.symbol);
                    break;
            }
            return formattedString.replace('XYZ', replacementValue);
        }
        return formattedString;
    }
    useDecimalStyle() {
        this.intlOptions.style = 'decimal';
        this.intlOptions.minimumFractionDigits = this.intlOptions.minimumFractionDigits !== undefined ? this.intlOptions.minimumFractionDigits : 2;
        this.intlOptions.maximumFractionDigits = this.intlOptions.maximumFractionDigits !== undefined ? this.intlOptions.maximumFractionDigits : 2;
        delete this.intlOptions.currency;
    }
    determineLocale() {
        if (typeof window !== 'undefined' && navigator.languages && navigator.languages.length) {
            return navigator.languages[0];
        }
        else if (typeof window !== 'undefined' && navigator.language) {
            return navigator.language;
        }
        return 'en';
    }
    addType(value) {
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

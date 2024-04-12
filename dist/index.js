class ExchNumberFormat {
    constructor(locales, options = {}) {
        this.version = '1.1.1';
        this.replacer = 'XYZ';
        this.totalCurrencyData = {};
        this.totalAliases = {};
        this.internalAliases = {};
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
            'XAB': {
                'symbol': 't₡',
                'narrowSymbol': 't₡',
                'code': 'XAB',
                'name': 'CoreDevin',
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
                'symbol': '₡',
                'narrowSymbol': '₡',
                'code': 'XCE',
                'name': 'CoreKoliba',
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
        this.internalAliases = {};
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
            aliases: {},
            useCustomCurrency: true,
            customCurrency: {},
        };
        this.intlOptions = { ...defaultOptions, ...options };
        this.totalAliases = { ...this.intlOptions.aliases, ...this.internalAliases };
        if (this.intlOptions.useCustomCurrency) {
            this.totalCurrencyData = { ...this.customCurrencyData, ...this.intlOptions.customCurrency };
        }
        else {
            this.totalCurrencyData = {};
        }
        this.originalCurrency = this.intlOptions.currency;
        if (this.intlOptions.useAliases && this.originalCurrency && this.totalAliases[this.originalCurrency]) {
            this.originalCurrency = this.totalAliases[this.originalCurrency];
        }
        let setLocale = locales === 'auto' ? this.determineLocale() : locales;
        const currencyData = this.totalCurrencyData[this.originalCurrency?.toUpperCase() || ''];
        if (this.originalCurrency && currencyData) {
            this.intlOptions.currency = this.replacer;
            this.intlOptions.minimumFractionDigits = currencyData.defaultDecimals;
        }
        try {
            if (this.intlOptions.currency) {
                this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
            }
            else {
                this.useDecimalStyle();
                this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
            }
        }
        catch (error) {
            if (error instanceof RangeError) {
                this.useDecimalStyle();
                this.formatter = new Intl.NumberFormat(setLocale, this.intlOptions);
            }
            else {
                console.error("Error creating Intl.NumberFormat instance");
                return;
            }
        }
    }
    format(number) {
        let formatted = this.formatter.format(number);
        return this.replaceCurrency(formatted);
    }
    formatToParts(number) {
        const parts = this.formatter.formatToParts(number);
        if (this.originalCurrency && this.totalCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.totalCurrencyData[this.originalCurrency.toUpperCase()];
            parts.forEach(part => {
                if (part.type === 'currency') {
                    part.value = part.value.replace(this.replacer, this.addType(currencyData.symbol));
                }
            });
        }
        else if (this.originalCurrency) {
            parts.forEach(part => {
                if (part.type === 'currency') {
                    part.value = this.addType(part.value);
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
            if (error instanceof RangeError) {
                return false;
            }
            else {
                console.warn("Error creating Intl.NumberFormat instance");
                return false;
            }
        }
    }
    replaceCurrency(input) {
        if (this.originalCurrency && this.totalCurrencyData[this.originalCurrency.toUpperCase()]) {
            const currencyData = this.totalCurrencyData[this.originalCurrency.toUpperCase()];
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
            return input.replace(this.replacer, replacementValue);
        }
        else if (this.originalCurrency) {
            switch (this.intlOptions.currencyDisplay) {
                case 'narrowSymbol':
                    input = this.addType(input);
                    break;
                case 'code':
                    input = input.replace(this.originalCurrency, this.addType(this.originalCurrency));
                    break;
                case 'name':
                    input = this.addType(input);
                    break;
                default:
                    input = this.addType(input);
                    break;
            }
            return input;
        }
        return input;
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

interface RoundNumberOptions extends Intl.NumberFormatOptions {
    locale?: string | undefined | 'auto';
    zerosClass?: string | null;
}

function roundNumber(number: number, options: RoundNumberOptions = {}): string {
    const currencySymbols: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } } = {
        'BTC': {
            'symbol': '₿',
            'narrowSymbol': 'BTC₿',
            'code': 'BTC',
            'name': 'Bitcoin',
            'defaultDecimals': 8,
        },
        'LTC': {
            'symbol': 'Ł',
            'narrowSymbol': 'LTCŁ',
            'code': 'LTC',
            'name': 'Litecoin',
            'defaultDecimals': 8,
        },
        'ETH': {
            'symbol': 'Ξ',
            'narrowSymbol': 'ETHΞ',
            'code': 'ETH',
            'name': 'Ethereum',
            'defaultDecimals': 8,
        },
        'XCB': {
            'symbol': '₡',
            'narrowSymbol': 'XCB₡',
            'code': 'XCB',
            'name': 'Core',
            'defaultDecimals': 8,
        },
        'CTN': {
            'symbol': '𝇊',
            'narrowSymbol': 'CTN𝇊',
            'code': 'CTN',
            'name': 'CoreToken',
            'defaultDecimals': 2,
        },
        'USDC': {
            'symbol': 'Ⓢ',
            'narrowSymbol': 'USDCⓈ',
            'code': 'USDC',
            'name': 'USD Coin',
            'defaultDecimals': 2,
        },
        'USDT': {
            'symbol': '₮',
            'narrowSymbol': 'USDT₮',
            'code': 'USDT',
            'name': 'Tether',
            'defaultDecimals': 2,
        },
    };

    // Default options
    const defaultOptions: RoundNumberOptions = {
        localeMatcher: 'best fit',
        style: 'currency',
        currency: undefined,
        currencyDisplay: 'symbol',
        roundFunction: 'floor',
        useGrouping: true,
        notation: 'standard',
        compactDisplay: 'short',
        // Custom options
        locale: 'auto',
        zerosClass: null,
    };

    // Merge user-defined options with default options
    const mergedOptions = { ...defaultOptions, ...options };

    // Extracting custom options
    const { locale, zerosClass, ...intlOptions } = mergedOptions;

    let numberStr: string = '';

    let setLocale = undefined;
    if (locale === 'auto') {
        setLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    } else if (locale) {
        setLocale = locale;
    } else {
        setLocale = undefined;
    }

    // Apply Intl.NumberFormat formatting
    const numberFormatter = new Intl.NumberFormat(setLocale, intlOptions);
    numberStr = numberFormatter.format(number);

    // Check for custom currency and set the symbol accordingly
    const upperCurrency = intlOptions.currency.toUpperCase();
    if (intlOptions.style === 'currency' && currencySymbols[upperCurrency]) {
        const currencyData = currencySymbols[upperCurrency];
        let symbolToReplace = currencyData.symbol;

        switch (intlOptions.currencyDisplay) {
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

        numberStr = numberStr.replace(upperCurrency, symbolToReplace);
    }

    // Add span class for trailing zeros
    if (mergedOptions.zerosClass && mergedOptions.trailingZeroDisplay!=='stripIfInteger') {
        numberStr = numberStr.replace(/0+$/, `<span class="${mergedOptions.zerosClass}">$&</span>`);
    }

    return numberStr;
}

export default roundNumber;

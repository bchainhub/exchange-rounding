interface RoundNumberOptions extends Intl.NumberFormatOptions {
    roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
    wrapped?: boolean;
    wrappedSymbol?: string;
    digitized?: boolean;
    digitizedSymbol?: string;
    useAliases?: boolean;
    aliases?: {
        [key: string]: string;
    };
    useCustomCurrency?: boolean;
    customCurrency?: {
        [key: string]: {
            symbol: string;
            narrowSymbol: string;
            code: string;
            name: string;
            defaultDecimals: number;
        };
    };
}
declare class ExchNumberFormat {
    version: string;
    private replacer;
    private formatter;
    private intlOptions;
    private customCurrencyData;
    private totalCurrencyData;
    private originalCurrency;
    private totalAliases;
    private internalAliases;
    constructor(locales?: string | undefined, options?: RoundNumberOptions);
    format(number: number): string;
    formatToParts(number: number): Intl.NumberFormatPart[];
    isCurrencySupported(currency: string): boolean;
    private replaceCurrency;
    private useDecimalStyle;
    private determineLocale;
    private addType;
}
export default ExchNumberFormat;

interface RoundNumberOptions extends Intl.NumberFormatOptions {
    roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
    wrapped?: boolean;
    wrappedSymbol?: string;
    digitalized?: boolean;
    digitalizedSymbol?: string;
    useAliases?: boolean;
}
declare class ExchNumberFormat {
    version: string;
    private formatter;
    private intlOptions;
    private customCurrencyData;
    private aliases;
    private originalCurrency;
    constructor(locales: string | undefined, options?: RoundNumberOptions);
    format(number: number): string;
    formatToParts(number: number): Intl.NumberFormatPart[];
    private replaceCurrency;
    private useDecimalStyle;
    private determineLocale;
    private addType;
}
export default ExchNumberFormat;

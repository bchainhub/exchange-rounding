interface RoundNumberOptions extends Intl.NumberFormatOptions {
    customCurrency?: string;
    roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
}
declare class ExchNumberFormat {
    private formatter;
    private intlOptions;
    private customCurrencyData;
    private originalCurrency;
    constructor(locales: string, options?: RoundNumberOptions);
    format(number: number): string;
    formatToParts(number: number): Intl.NumberFormatPart[];
    private replaceCurrency;
}
export default ExchNumberFormat;

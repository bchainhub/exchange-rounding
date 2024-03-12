export interface RoundNumberOptions extends Intl.NumberFormatOptions {
	customCurrency?: string;
	roundingMode?: 'ceil' | 'expand' | 'floor' | 'trunc' | 'halfCeil' | 'halfExpand' | 'halfFloor' | 'halfTrunc' | 'halfEven' | 'halfOdd';
}

export interface CurrencyData {
	symbol: string;
	narrowSymbol: string;
	code: string;
	name: string;
	defaultDecimals: number;
}

export declare class ExchNumberFormat {
	private formatter: Intl.NumberFormat;
	private intlOptions: RoundNumberOptions;
	private customCurrencyData: { [key: string]: CurrencyData };
	private originalCurrency: string | undefined;

	constructor(locales: string, options?: RoundNumberOptions);

	format(number: number): string;
	formatToParts(number: number): Intl.NumberFormatPart[];
}

export as namespace ExchNumberFormat;

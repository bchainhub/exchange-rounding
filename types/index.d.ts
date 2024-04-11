export interface RoundNumberOptions extends Intl.NumberFormatOptions {
	roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
	wrapped?: boolean;
	wrappedSymbol?: string;
	digitalized?: boolean;
	digitalizedSymbol?: string;
	useAliases?: boolean;
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
	private aliases: { [key: string]: string };
	private originalCurrency: string | undefined;

	constructor(locales: string | undefined, options?: RoundNumberOptions);

	format(number: number): string;
	formatToParts(number: number): Intl.NumberFormatPart[];
	version: string;
}

export as namespace ExchNumberFormat;

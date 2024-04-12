export interface RoundNumberOptions extends Intl.NumberFormatOptions {
	roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
	wrapped?: boolean;
	wrappedSymbol?: string;
	digitized?: boolean;
	digitizedSymbol?: string;
	useAliases?: boolean;
	aliases?: { [key: string]: string };
	useCustomCurrency?: boolean;
	customCurrency?: { [key: string]: { symbol: string, narrowSymbol: string, code: string, name: string, defaultDecimals: number } };
}

export interface CurrencyData {
	symbol: string;
	narrowSymbol: string;
	code: string;
	name: string;
	defaultDecimals: number;
}

export declare class ExchNumberFormat {
	version: string;
	private formatter: Intl.NumberFormat;
	private intlOptions: RoundNumberOptions;
	private customCurrencyData: { [key: string]: CurrencyData };
	private totalCurrencyData: { [key: string]: CurrencyData };
	private originalCurrency: string | undefined;
	private totalAliases: { [key: string]: string };
	private internalAliases: { [key: string]: string };

	constructor(locales?: string | undefined, options?: RoundNumberOptions);

	format(number: number): string;
	formatToParts(number: number): Intl.NumberFormatPart[];
	isCurrencySupported(currency: string): boolean;
}

export as namespace ExchNumberFormat;

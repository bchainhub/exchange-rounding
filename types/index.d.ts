export interface RoundNumberOptions extends Intl.NumberFormatOptions {
	roundingMode?: 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';
	wrapped?: boolean;
	wrappedSymbol?: string;
	digitized?: boolean;
	digitizedSymbol?: string;
	useAliases?: boolean;
	aliases?: Record<string, string>;
	useCustomCurrency?: boolean;
	customCurrency?: Record<string, CurrencyData>;
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
	private customCurrencyData: Record<string, CurrencyData>;
	private totalCurrencyData: Record<string, CurrencyData>;
	private originalCurrency: string | undefined;
	private totalAliases: Record<string, string>;
	private internalAliases: Record<string, string>;

	constructor(locales?: string, options?: RoundNumberOptions);

	format(number: number): string;
	formatToParts(number: number): Intl.NumberFormatPart[];
	isCurrencySupported(currency: string): boolean;
}

export as namespace ExchNumberFormat;

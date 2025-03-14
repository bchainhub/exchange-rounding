# Exchange Number Formatting (`ExchNumberFormat`)

[![npm](https://img.shields.io/npm/v/exchange-rounding?label=npm&color=cb3837&logo=npm)](https://www.npmjs.com/package/exchange-rounding)
[![License: CORE](https://img.shields.io/badge/License-CORE-yellow?logo=googledocs)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/exchange-rounding?label=Size&logo=tsnode)](https://bundlephobia.com/package/exchange-rounding@latest)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/bchainhub?label=Sponsors&logo=githubsponsors&color=EA4AAA)](https://github.com/sponsors/bchainhub)

`ExchNumberFormat` is a comprehensive and customizable number formatting utility, designed specifically for financial and cryptocurrency applications. It extends the standard `Intl.NumberFormat` functionality with support for custom currencies, including cryptocurrencies, and provides additional formatting options.

## Features

- **Standard and Custom Currencies**: Extensive support for both standard ISO currencies and custom-defined currencies, including cryptocurrencies.
- **Rounding Modes**: Supports various rounding modes to meet different financial calculation requirements.
- **Locale-Aware Formatting**: Offers locale-aware formatting, supporting different number styles and notations.
- **Custom Currency Attributes**: Manages custom attributes for each currency, such as symbols, codes, and decimal places.
- **Dynamic Currency Support**: Dynamically adds or modifies currency definitions at runtime using the `useCustomCurrency` and `customCurrency` options.
- **Tested**: Robust test coverage.
- **Tree Shaking**: Zero dependencies, no side effects.

## Installation

Install the package using npm:

```bash
npm i exchange-rounding
```

Or using yarn:

```bash
yarn add exchange-rounding
```

## Usage

### Basic Usage

```typescript
import ExchNumberFormat from 'exchange-rounding';

// Example: Formatting a number with Bitcoin currency
const bitcoinFormatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'BTC',
    roundingMode: 'halfFloor',
    currencyDisplay: 'symbol'
});

const formattedBTC = bitcoinFormatter.format(1234.567);
console.log(formattedBTC); // Output: '₿1,234.567'

// Example: Formatting with custom options
const customFormatter = new ExchNumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 5
});

const formattedNumber = customFormatter.format(1234.56789);
console.log(formattedNumber); // Output: '1,234.56789'
```

### Advanced Usage with Custom Currencies

```typescript
const customCurrencyData = {
    'XCB': {
        symbol: '₡',
        narrowSymbol: '₡',
        code: 'XCB',
        name: 'Core',
        defaultDecimals: 2
    }
};

const formatter = new ExchNumberFormat('en-US', {
    useCustomCurrency: true,
    customCurrency: customCurrencyData,
    currency: 'XCB'
});

console.log(formatter.format(1234.567)); // Output: '₡1,234.57'
```

## API Reference

### new ExchNumberFormat(locales, options)

Creates a new formatter instance configured with the specified locales and options.

#### Parameters

- `locales`: A string with a BCP 47 language tag or an array of such strings.
- `options`: Configuration options for the formatter.

#### Options

- Inherits all options from `Intl.NumberFormatOptions`.
- `useAliases`: Enables the use of currency aliases.
- `aliases`: Defines mappings from alias strings to standard currency codes.
- `useCustomCurrency`: Enables the use of a custom currency dictionary.
- `customCurrency`: Specifies custom currency settings.
- `wrapped`: Indicates if the currency symbol should be wrapped with custom characters.
- `wrappedSymbol`: The symbol used to wrap the currency symbol.
- `digitized`: Indicates if the numeric values should be displayed with digital symbols.
- `digitizedSymbol`: The symbol used to represent digitized values.
- `roundingMode`: The rounding mode to use when formatting numbers.
- `cropZeros`: Controls the handling of trailing zeros in the decimal part:
  - `true`: Removes all trailing zeros
  - `false` (default): Keeps all trailing zeros according to `maximumFractionDigits`
  - `number`: Keeps at least this many trailing zeros (e.g., `2` would ensure at least two decimal places)

### Rounding Modes

- `ceil`: Rounds numbers up.
- `floor`: Rounds numbers down.
- `expand`: Similar to ceil but expands beyond the typical rounding limits.
- `trunc`: Truncates the number without rounding.
- `halfCeil`: Rounds half values up.
- `halfFloor`: Rounds half values down.
- `halfExpand`: Expands half values during rounding.
- `halfTrunc`: Truncates half values.
- `halfEven`: Rounds half values to the nearest even number.

### format(number)

Formats a number according to the instance's locale and formatting options.

### formatToParts(number)

Returns an array of objects representing the number string in parts that can be used for custom formatting.

### isCurrencySupported(currency)

Checks if the specified currency is supported by the formatter. Returns `true` if the currency is supported and `false` otherwise. If the formatter fails, an error is thrown.

### version

Prints the version of the `exchange-rounding` package.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the [CORE License](LICENSE).

## Funding

If you find this project useful, please consider supporting it:

- [GitHub Sponsors](https://github.com/sponsors/bchainhub)
- [Core](https://blockindex.net/address/cb7147879011ea207df5b35a24ca6f0859dcfb145999)
- [Bitcoin](https://www.blockchain.com/explorer/addresses/btc/bc1pd8guxjkr2p6n2kl388fdj2trete9w2fr89xlktdezmcctxvtzm8qsymg0d)
- [Litecoin](https://www.blockchain.com/explorer/addresses/ltc/ltc1ql8dvx0wv0nh2vncpt9j3zqefaehsd25cwp7pfx)

List of sponsors: [![GitHub Sponsors](https://img.shields.io/github/sponsors/bchainhub?label=Sponsors&logo=githubsponsors&color=EA4AAA)](https://github.com/sponsors/bchainhub)

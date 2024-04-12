# Exchange Number Formatting (`ExchNumberFormat`)

`ExchNumberFormat` is a comprehensive and customizable number formatting utility, designed specifically for financial and cryptocurrency applications. It extends the standard `Intl.NumberFormat` functionality with support for custom currencies, including cryptocurrencies, and provides additional formatting options.

## Features

- **Standard and Custom Currencies**: Extensive support for both standard ISO currencies and custom-defined currencies including cryptocurrencies.
- **Rounding Modes**: Supports various rounding modes to meet different financial calculations requirements.
- **Locale-Aware Formatting**: Offers locale-aware formatting, supporting different number styles and notations.
- **Custom Currency Attributes**: Manages custom attributes for each currency, such as symbols, codes, and decimal places.
- **Dynamic Currency Support**: Dynamically adds or modifies currency definitions at runtime using `useCustomCurrency` and `customCurrency` options.

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
        name: 'CoreCoin',
        defaultDecimals: 2
    }
};

const formatter = new ExchNumberFormat('en-US', {
    useCustomCurrency: true,
    customCurrency: customCurrencyData,
    currency: 'XCB'
});

console.log(formatter.format(1234.567)); // Outputs: '₡1,234.57'
```

## API Reference

### new ExchNumberFormat(locales, options)

Creates a new formatter instance configured with the specified locales and options.

#### Parameters

- `locales`: A string with a BCP 47 language tag, or an array of such strings.
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

Checks if the specified currency is supported by the formatter. Returns `true` if the currency is supported, `false` otherwise. If the formatter failed, an error is thrown.

### version

Prints the version of the `exchange-rounding` package.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the [CORE License](LICENSE).

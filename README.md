# Exchange Number Formatting (`ExchNumberFormat`)

`ExchNumberFormat` is a comprehensive and customizable number formatting utility, designed specifically for financial and cryptocurrency applications. It extends the standard `Intl.NumberFormat` functionality with support for custom currencies, including cryptocurrencies, and provides additional formatting options.

## Features

- Support for standard and custom currencies (including cryptocurrencies like Bitcoin, Ethereum, etc.).
- Customizable rounding modes.
- Locale-aware formatting with support for different number styles and notations.
- Ability to handle custom currency symbols, narrow symbols, codes, and names.
- Customizable decimal places for each currency.
- Format numbers as parts for detailed customization.

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

Import `ExchNumberFormat` from the package and use it in your project:

```javascript
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

## API Reference

### new ExchNumberFormat(locales, options)

Creates a new `ExchNumberFormat` instance.

#### Parameters

- `locales` (String): A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the `locales` argument, see the Intl page.
- `options` (RoundNumberOptions): An object with properties that represent the formatting options.

#### RoundNumberOptions

- Inherits all options from `Intl.NumberFormatOptions`.
- `roundingMode` (String): Rounding mode according to the `Intl.NumberFormat` documentation.

### format(number)

Formats a number according to the instance's locale and formatting options.

### formatToParts(number)

Returns an array of objects representing the number string in parts that can be used for custom formatting.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the [CORE License](LICENSE).

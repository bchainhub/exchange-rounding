# Exchange Rounding

`exchange-rounding` is a flexible and powerful rounding utility designed for handling decimal numbers, specifically tailored for financial and exchange-related applications. It offers customizable options to suit a variety of rounding and formatting requirements.

## Features

- Customizable decimal places.
- Selection of rounding methods: `round`, `floor`, `ceil`.
- Option to keep or remove trailing zeros.
- Ability to add prefixes and suffixes with non-breaking spaces.
- Insertion of spaces within numbers after a specified number of decimal places.
- Application of CSS classes to trailing zeros.
- Locale-specific formatting options.

## Installation

Install the package using npm:

```bash
npm install exchange-rounding
```

Or using yarn:

```bash
yarn add exchange-rounding
```

## Usage

Import `roundNumber` from the package and use it in your project:

```javascript
import roundNumber from 'exchange-rounding';

const options = {
    decimals: 2,
    roundFunction: 'floor',
    keepTrailingZeros: true,
    prefix: '$',
    suffix: 'USD',
    spaceAfterDecimal: 3,
    spanClass: 'trailing-zeros',
    localeString: { style: 'currency', currency: 'USD' }
};

const rounded = roundNumber(1234.56789, options);
console.log(rounded); // Output will depend on the options
```

## API Reference

### roundNumber(number, options)

Rounds a number based on the provided options.

#### Parameters

- `number` (Number): The number to round.
- `options` (Object): An object containing various formatting options.

#### Options

- `decimals` (Number): Number of decimal places to retain (default: 8).
- `roundFunction` (String): Method of rounding - 'round', 'floor', 'ceil' (default: 'floor').
- `keepTrailingZeros` (Boolean): Keep or remove trailing zeros (default: true).
- `prefix` (String): String to prepend (default: '').
- `suffix` (String): String to append (default: '').
- `spaceAfterDecimal` (Number | null): Insert space after specified decimals (default: null).
- `spanClass` (String): CSS class for trailing zeros (default: '').
- `localeString` (Intl.NumberFormatOptions | null): Locale formatting options (default: null).

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, feel free to open an issue on the project's [issues page](https://github.com/bchainhub/exchange-rounding/issues). If you're interested in contributing to the code, please feel free to make a pull request.

## License

This project is licensed under the MIT License.

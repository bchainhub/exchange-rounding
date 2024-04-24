import ExchNumberFormat from '../src/index';

describe('Added currencies', () => {
  it('Bitcoin with symbol, locale en-US currency and default 8 decimals', () => {
    const formatter = new ExchNumberFormat('en-US', {
      style: 'currency',
      currency: 'BTC',
      roundingMode: 'floor',
      currencyDisplay: 'symbol'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('₿ 1,234.12345678');
  });

  it('XCB with name, locale sk-SK currency and default 2 decimals', () => {
    const formatter = new ExchNumberFormat('sk-SK', {
      style: 'currency',
      currency: 'XCB',
      roundingMode: 'floor',
      currencyDisplay: 'name'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('1 234,123 Core');
  });

  it('XCB with symbol, locale en', () => {
    const formatter = new ExchNumberFormat('en', {
      style: 'currency',
      currency: 'xcb',
      currencyDisplay: 'symbol'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('₡ 1,234.123');
  });

  it('USDC with narrowSymbol, locale it-CH currency and default 2 decimals', () => {
    const formatter = new ExchNumberFormat('it-CH', {
      style: 'currency',
      currency: 'USDC',
      roundingMode: 'floor',
      currencyDisplay: 'narrowSymbol'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('USⓈ 1’234.12');
  });
});

describe('Shortening/Extending tests', () => {
  it('USD with symbol, locale en-US currency and minimum digits and decimals', () => {
    const formatter = new ExchNumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      roundingMode: 'halfFloor',
      currencyDisplay: 'symbol',
      minimumIntegerDigits: 6,
      minimumFractionDigits: 4
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('$001,234.1235');
  });

  it('CZK with name, locale cs-CZ currency and 2 maximum significant digits', () => {
    const formatter = new ExchNumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'USD',
      roundingMode: 'expand',
      currencyDisplay: 'name',
      maximumSignificantDigits: 2
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('1 300 amerických dolarů');
  });

  it('USD with symbol, locale en-US currency and short to Billions', () => {
    const formatter = new ExchNumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      roundingMode: 'halfFloor',
      currencyDisplay: 'symbol',
      useGrouping: true,
      notation: "compact",
      compactDisplay: "short"
    });
    const result = formatter.format(1234567890.1234567899);
    expect(result).toBe('$1.2B');
  });

  it('GBP with symbol, locale en-US currency and long to Millions', () => {
    const formatter = new ExchNumberFormat('en-US', {
      style: 'currency',
      currency: 'GBP',
      roundingMode: 'halfFloor',
      currencyDisplay: 'narrowSymbol',
      useGrouping: true,
      notation: "compact"
    });
    const result = formatter.format(1234567.1234567899);
    expect(result).toBe('£1.2M');
  });
});

describe('Different locales', () => {
  it('JPY, locale ja-JP', () => {
    const formatter = new ExchNumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('￥1,234');
  });

  it('RUB, locale ru', () => {
    const formatter = new ExchNumberFormat('ru', {
      style: 'currency',
      currency: 'RUB'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('1 234,12 ₽');
  });

  it('CNY, locale zh', () => {
    const formatter = new ExchNumberFormat('zh', {
      style: 'currency',
      currency: 'CNY'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('¥1,234.12');
  });

  it('CTN, locale bn-BN', () => {
    const formatter = new ExchNumberFormat('bn-BN', {
      style: 'currency',
      currency: 'CTN'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('১,২৩৪.১২ Ƈ');
  });

  it('LTC, locale pt-BR', () => {
    const formatter = new ExchNumberFormat('pt-BR', {
      style: 'currency',
      currency: 'LTC'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('Ł 1.234,123');
  });
});

describe('Defaults', () => {
  it('Default locale and no currency', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('1,234.12');
  });

  it('Default locale, 3 digits, and no currency', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('1,234.123');
  });

  it('Unknown currency', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'XXX'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('¤ 1,234.12');
  });
});

describe('Extended coins', () => {
  it('Wrapped coins', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'BTC',
      wrapped: true,
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('w₿ 1,234.12345679');
  });

  it('Wrapped FIAT', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      wrapped: true,
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('w$1,234.12');
  });

  it('Digitized coins', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'BTC',
      digitized: true,
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('d₿ 1,234.12345679');
  });

  it('Digitized FIAT', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'EUR',
      digitized: true,
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('d€1,234.12');
  });

  it('Digitized FIAT - display code', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      digitized: true,
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('dEUR 1,234.12');
  });

  it('Added new coin', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'XOR',
      customCurrency: {
        'XOR': {
          'symbol': 'x',
          'narrowSymbol': 'x',
          'code': 'XOR',
          'name': 'XorGate',
          'defaultDecimals': 2,
        }
      },
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('x 1,234.12');
  });

  it('Replaced existing coin', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'ETH',
      customCurrency: {
        'ETH': {
          'symbol': 'e',
          'narrowSymbol': 'e',
          'code': 'ETH',
          'name': 'Ether',
          'defaultDecimals': 2,
        },
      },
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('e 1,234.12');
  });
});

describe('Decomposed', () => {
  it('BTC with narrowSymbol, locale en-US currency and default 2 decimals', () => {
    const formatter = new ExchNumberFormat('en-US', {
      style: 'currency',
      currency: 'BTC',
      roundingMode: 'floor',
      currencyDisplay: 'narrowSymbol'
    });
    const result = formatter.formatToParts(1234.1234567899);
    expect(result).toEqual([{"type": "currency", "value": "₿"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "12345678"}]);
  });

  it('USD with symbol, locale it-CH currency and minimum digits and decimals', () => {
    const formatter = new ExchNumberFormat('it-CH', {
      style: 'currency',
      currency: 'USD',
      roundingMode: 'ceil',
      currencyDisplay: 'symbol',
      minimumIntegerDigits: 6,
      minimumFractionDigits: 4
    });
    const result = formatter.formatToParts(1234.1234567899);
    expect(result).toEqual([{"type": "currency", "value": "USD"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "001"}, {"type": "group", "value": "’"}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "1235"}]);
  });

  it('Wrapped USD with symbol, currency and minimum digits and decimals', () => {
    const formatter = new ExchNumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      roundingMode: 'ceil',
      currencyDisplay: 'symbol',
      wrapped: true
    });
    const result = formatter.formatToParts(1234.1234567899);
    expect(result).toEqual([{"type": "currency", "value": "w$"}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "13"}]);
  });

  it('Digitized USD with symbol, locale it-CH currency and minimum digits and decimals', () => {
    const formatter = new ExchNumberFormat('it-CH', {
      style: 'currency',
      currency: 'USD',
      roundingMode: 'ceil',
      currencyDisplay: 'symbol',
      digitized: true
    });
    const result = formatter.formatToParts(1234.1234567899);
    expect(result).toEqual([{"type": "currency", "value": "dUSD"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": "’"}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "13"}]);
  });

  it('XCB with symbol, locale en currency and default 4 decimals', () => {
    const formatter = new ExchNumberFormat('en', {
      style: 'currency',
      currency: 'xcb',
      roundingMode: 'floor',
      currencyDisplay: 'symbol'
    });
    const result = formatter.formatToParts(1234.1234567899);
    expect(result).toEqual([{"type": "currency", "value": "₡"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "123"}]);
  });
});

describe('Additional', () => {
  it('Check if currency is supported - XCB should be', () => {
    const formatter = new ExchNumberFormat(undefined);
    const result = formatter.isCurrencySupported('xcb');
    expect(result).toBe(true);
  });

  it('Check if currency is supported - USD should be', () => {
    const formatter = new ExchNumberFormat(undefined);
    const result = formatter.isCurrencySupported('usd');
    expect(result).toBe(true);
  });

  it('Check if currency is supported - XPOP shouldn\'t be', () => {
    const formatter = new ExchNumberFormat(undefined);
    const result = formatter.isCurrencySupported('xpop');
    expect(result).toBe(false);
  });

  it('Unknown currency', () => {
    const formatter = new ExchNumberFormat(undefined, {
      style: 'currency',
      currency: 'XXX',
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('¤ 1,234.12');
  });

  it('Print current version', () => {
    const formatter = new ExchNumberFormat();
    const result = formatter.version;
    expect(result).toBe('1.1.3');
  });
});

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
    expect(result).toBe('1 234,12345678 Core');
  });

  it('USDC with narrowSymbol, locale it-CH currency and default 2 decimals', () => {
    const formatter = new ExchNumberFormat('it-CH', {
      style: 'currency',
      currency: 'USC',
      roundingMode: 'floor',
      currencyDisplay: 'narrowSymbol'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('USDCⓈ 1’234.12');
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
    expect(result).toBe('১,২৩৪.১২ 𝇊');
  });

  it('LTC, locale pt-BR', () => {
    const formatter = new ExchNumberFormat('pt-BR', {
      style: 'currency',
      currency: 'LTC'
    });
    const result = formatter.format(1234.1234567899);
    expect(result).toBe('Ł 1.234,12345679');
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
    expect(result).toEqual([{"type": "currency", "value": "BTC₿"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "12345678"}]);
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
});

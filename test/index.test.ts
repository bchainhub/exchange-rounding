import test from 'node:test';
import assert from 'node:assert';
import ExchNumberFormat from '../src/index.js';

test('Bitcoin with symbol, locale en-US currency and default 8 decimals', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'BTC',
    roundingMode: 'floor',
    currencyDisplay: 'symbol'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '₿ 1,234.12345678');
});

test('XCB with name, locale sk-SK currency and default 2 decimals', () => {
  const formatter = new ExchNumberFormat('sk-SK', {
    style: 'currency',
    currency: 'XCB',
    roundingMode: 'floor',
    currencyDisplay: 'name'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1 234,123 Core');
});

test('XCB with symbol, locale en', () => {
  const formatter = new ExchNumberFormat('en', {
    style: 'currency',
    currency: 'xcb',
    currencyDisplay: 'symbol'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '₡ 1,234.123');
});

test('USDC with narrowSymbol, locale it-CH currency and default 2 decimals', () => {
  const formatter = new ExchNumberFormat('it-CH', {
    style: 'currency',
    currency: 'USDC',
    roundingMode: 'floor',
    currencyDisplay: 'narrowSymbol'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '$C 1’234.12');
});

test('USD with symbol, locale en-US currency and minimum digits and decimals', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    roundingMode: 'halfFloor',
    currencyDisplay: 'symbol',
    minimumIntegerDigits: 6,
    minimumFractionDigits: 4
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '$001,234.1235');
});

test('CZK with name, locale cs-CZ currency and 2 maximum significant digits', () => {
  const formatter = new ExchNumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'USD',
    roundingMode: 'expand',
    currencyDisplay: 'name',
    maximumSignificantDigits: 2
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1 300 amerických dolarů');
});

test('USD with symbol, locale en-US currency and short to Billions', () => {
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
  assert.strictEqual(result, '$1.2B');
});

test('GBP with symbol, locale en-US currency and long to Millions', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
    roundingMode: 'halfFloor',
    currencyDisplay: 'narrowSymbol',
    useGrouping: true,
    notation: "compact"
  });
  const result = formatter.format(1234567.1234567899);
  assert.strictEqual(result, '£1.2M');
});

test('JPY, locale ja-JP', () => {
  const formatter = new ExchNumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '￥1,234');
});

test('RUB, locale ru', () => {
  const formatter = new ExchNumberFormat('ru', {
    style: 'currency',
    currency: 'RUB'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1 234,12 ₽');
});

test('CNY, locale zh', () => {
  const formatter = new ExchNumberFormat('zh', {
    style: 'currency',
    currency: 'CNY'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '¥1,234.12');
});

test('CTN, locale bn-BN', () => {
  const formatter = new ExchNumberFormat('bn-BN', {
    style: 'currency',
    currency: 'CTN'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '১,২৩৪.১২ Ƈ');
});

test('LTC, locale pt-BR', () => {
  const formatter = new ExchNumberFormat('pt-BR', {
    style: 'currency',
    currency: 'LTC'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'Ł 1.234,123');
});

test('Default locale and no currency', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1,234.12');
});

test('Default locale, 3 digits, and no currency', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1,234.123');
});

test('Unknown currency', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'XXX'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '¤ 1,234.12');
});

test('Wrapped coins', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'BTC',
    wrapped: true,
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'w₿ 1,234.12345679');
});

test('Wrapped FIAT', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    wrapped: true,
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'w$1,234.12');
});

test('Digitized coins', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'BTC',
    digitized: true,
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'd₿ 1,234.12345679');
});

test('Digitized FIAT', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
    digitized: true,
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'd€1,234.12');
});

test('Digitized FIAT - display code', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    digitized: true,
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'dEUR 1,234.12');
});

test('Added new coin', () => {
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
  assert.strictEqual(result, 'x 1,234.12');
});

test('Replaced existing coin', () => {
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
  assert.strictEqual(result, 'e 1,234.12');
});

test('BTC with narrowSymbol, locale en-US currency and default 2 decimals', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'BTC',
    roundingMode: 'floor',
    currencyDisplay: 'narrowSymbol'
  });
  const result = formatter.formatToParts(1234.1234567899);
  assert.deepStrictEqual(result, [{"type": "currency", "value": "₿"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "12345678"}]);
});

test('USD with symbol, locale it-CH currency and minimum digits and decimals', () => {
  const formatter = new ExchNumberFormat('it-CH', {
    style: 'currency',
    currency: 'USD',
    roundingMode: 'ceil',
    currencyDisplay: 'symbol',
    minimumIntegerDigits: 6,
    minimumFractionDigits: 4
  });
  const result = formatter.formatToParts(1234.1234567899);
  assert.deepStrictEqual(result, [{"type": "currency", "value": "USD"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "001"}, {"type": "group", "value": "’"}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "1235"}]);
});

test('Wrapped USD with symbol, currency and minimum digits and decimals', () => {
  const formatter = new ExchNumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    roundingMode: 'ceil',
    currencyDisplay: 'symbol',
    wrapped: true
  });
  const result = formatter.formatToParts(1234.1234567899);
  assert.deepStrictEqual(result, [{"type": "currency", "value": "w$"}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "13"}]);
});

test('Digitized USD with symbol, locale it-CH currency and minimum digits and decimals', () => {
  const formatter = new ExchNumberFormat('it-CH', {
    style: 'currency',
    currency: 'USD',
    roundingMode: 'ceil',
    currencyDisplay: 'symbol',
    digitized: true
  });
  const result = formatter.formatToParts(1234.1234567899);
  assert.deepStrictEqual(result, [{"type": "currency", "value": "dUSD"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": "’"}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "13"}]);
});

test('XCB with symbol, locale en currency and default 4 decimals', () => {
  const formatter = new ExchNumberFormat('en', {
    style: 'currency',
    currency: 'xcb',
    roundingMode: 'floor',
    currencyDisplay: 'symbol'
  });
  const result = formatter.formatToParts(1234.1234567899);
  assert.deepStrictEqual(result, [{"type": "currency", "value": "₡"}, {"type": "literal", "value": " "}, {"type": "integer", "value": "1"}, {"type": "group", "value": ","}, {"type": "integer", "value": "234"}, {"type": "decimal", "value": "."}, {"type": "fraction", "value": "123"}]);
});

test('Check if currency is supported - XCB should be', () => {
  const formatter = new ExchNumberFormat(undefined);
  const result = formatter.isCurrencySupported('xcb');
  assert.strictEqual(result, true);
});

test('Check if currency is supported - USD should be', () => {
  const formatter = new ExchNumberFormat(undefined);
  const result = formatter.isCurrencySupported('usd');
  assert.strictEqual(result, true);
});

test('Check if currency is supported - XPOP shouldn\'t be', () => {
  const formatter = new ExchNumberFormat(undefined);
  const result = formatter.isCurrencySupported('xpop');
  assert.strictEqual(result, false);
});

test('Unknown currency', () => {
  const formatter = new ExchNumberFormat(undefined, {
    style: 'currency',
    currency: 'XXX',
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '¤ 1,234.12');
});

test('Print current version', () => {
  const formatter = new ExchNumberFormat();
  const result = formatter.version;
  assert.strictEqual(result, '1.1.4');
});

test('USDX with symbol, locale en-US', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'USDX'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '$X 1,234.12');
});

test('EURX with name, locale de-DE', () => {
  const formatter = new ExchNumberFormat('de-DE', {
    style: 'currency',
    currency: 'EURX',
    currencyDisplay: 'name'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1.234,12 Euro X');
});

test('CHFX with narrowSymbol, locale fr-CH', () => {
  const formatter = new ExchNumberFormat('fr-CH', {
    style: 'currency',
    currency: 'CHFX',
    currencyDisplay: 'narrowSymbol'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1 234.12 ₣X');
});

test('XAU with symbol, locale en-US and 6 decimals', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'XAU'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'Au 1,234.123457');
});

test('XAG with name, locale en-GB and 6 decimals', () => {
  const formatter = new ExchNumberFormat('en-GB', {
    style: 'currency',
    currency: 'XAG',
    currencyDisplay: 'name'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1,234.123457 Silver');
});

test('XCU with symbol, locale es-ES and 2 decimals', () => {
  const formatter = new ExchNumberFormat('es-ES', {
    style: 'currency',
    currency: 'XCU'
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, '1.234,12 Cu');
});

test('Wrapped XAU with symbol, locale en-US', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'XAU',
    wrapped: true
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'wAu 1,234.123457');
});

test('Digitized XAG with symbol, locale en-US', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'XAG',
    digitized: true
  });
  const result = formatter.format(1234.1234567899);
  assert.strictEqual(result, 'dAg 1,234.123457');
});

test('USD with symbol, locale en-US currency and cropping all trailing zeros', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 4,
    cropZeros: true
  });
  const result = formatter.format(1234.1000);
  assert.strictEqual(result, '$1,234.1');
});

test('USD with symbol, locale en-US currency and keeping 2 minimum zeros', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 4,
    cropZeros: 2
  });
  const result = formatter.format(1234.1000);
  assert.strictEqual(result, '$1,234.10');
});

test('USD with symbol, locale en-US currency and cropping zeros with minimum 2 zeros but more allowed, when not zeros', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 4,
    cropZeros: 2
  });
  const result = formatter.format(20.001);
  assert.strictEqual(result, '$20.001');
});

test('USD with symbol, locale en-US currency and cropping zeros with extended decimals', () => {
  const formatter = new ExchNumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 4,
    cropZeros: 2
  });
  const result = formatter.format(20.001);
  assert.strictEqual(result, '$20.001');
});

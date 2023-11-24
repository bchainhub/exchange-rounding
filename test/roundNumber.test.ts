import roundNumber from '../src/index';

describe('roundNumber', () => {
  it('should round a number with default parameters', () => {
    const result = roundNumber(1234.1234567899);
    expect(result).toBe('1234.12345678');
  });
});

describe('roundNumber - Rounding Methods', () => {
  it('should round up using ceil', () => {
    const result = roundNumber(1234.12345666466, { roundFunction: 'ceil' });
    expect(result).toBe('1234.12345667');
  });

  it('should round down using floor', () => {
    const result = roundNumber(1234.12345677566, { roundFunction: 'floor' });
    expect(result).toBe('1234.12345677');
  });

  it('should round to nearest using round', () => {
    const result = roundNumber(1234.12345676466, { roundFunction: 'round' });
    expect(result).toBe('1234.12345676');
  });
});

describe('roundNumber - Decimal Places', () => {
  it('should keep 2 decimal places', () => {
    const result = roundNumber(1234.567890, { decimals: 2 });
    expect(result).toBe('1234.56');
  });

  it('should keep no decimal places', () => {
    const result = roundNumber(1234.567890, { decimals: 0 });
    expect(result).toBe('1234');
  });
});

describe('roundNumber - Trailing Zeros', () => {
  it('should keep trailing zeros', () => {
    const result = roundNumber(1234.5, { keepTrailingZeros: true });
    expect(result).toBe('1234.50000000');
  });

  it('should remove trailing zeros', () => {
    const result = roundNumber(1234.5000, { keepTrailingZeros: false });
    expect(result).toBe('1234.5');
  });
});

describe('roundNumber - Prefix and Suffix', () => {
  it('should add prefix', () => {
    const result = roundNumber(1234.56789, { prefix: '$' });
    expect(result).toBe('$\u00A01234.56789000');
  });

  it('should add suffix', () => {
    const result = roundNumber(1234.56789, { suffix: '€' });
    expect(result).toBe('1234.56789000\u00A0€');
  });

  it('should add both prefix and suffix', () => {
    const result = roundNumber(1234.56789, { prefix: '$', suffix: '€' });
    expect(result).toBe('$\u00A01234.56789000\u00A0€');
  });
});

describe('roundNumber - Space After Decimal', () => {
  it('should add space after every 3 decimal places', () => {
    const result = roundNumber(1234.56789, { spaceAfterDecimal: 3 });
    expect(result).toBe('1234.567\u00A0890\u00A000');
  });
});

describe('roundNumber - Span Class for Zeros', () => {
  it('should add span class for trailing zeros', () => {
    const result = roundNumber(1234.5, { spanClass: 'zero-class' });
    expect(result).toBe('1234.5<span class="zero-class">0000000</span>');
  });
});

describe('roundNumber - Locale String Formatting', () => {
  it('should format number with locale string', () => {
    const result = roundNumber(1234.56789, { localeString: { style: 'currency', currency: 'USD' } });
    expect(result).toBe('$1,234.57');
  });
});

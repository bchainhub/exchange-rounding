function roundNumber(number, options = {}) {
    const { decimals = 8, roundFunction = 'floor', keepTrailingZeros = true, prefix = '', suffix = '', spaceAfterDecimal = null, spanClass = '', localeString = null } = options;
    let roundedNumber;
    // Apply rounding function
    switch (roundFunction) {
        case 'round':
            roundedNumber = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
            break;
        case 'ceil':
            roundedNumber = Math.ceil(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
            break;
        default:
            roundedNumber = Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
            break;
    }
    // Convert to string for formatting
    let numberStr = roundedNumber.toFixed(decimals);
    // Remove trailing zeros if keepTrailingZeros is false
    if (!keepTrailingZeros) {
        numberStr = numberStr.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');
    }
    // Divide zeros with non-breakable space if required
    if (spaceAfterDecimal !== null) {
        let parts = numberStr.split('.');
        parts[1] = parts[1].replace(new RegExp(`(\\d{${spaceAfterDecimal}})(?=(\\d))`, 'g'), `$1\u00A0`);
        numberStr = parts.join('.');
    }
    // Add span class for trailing zeros
    if (spanClass && keepTrailingZeros) {
        numberStr = numberStr.replace(/0+$/, `<span class="${spanClass}">$&</span>`);
    }
    // Apply locale formatting
    if (localeString) {
        numberStr = Number(numberStr).toLocaleString(undefined, localeString);
    }
    // Add prefix and suffix with non-breaking space
    return `${prefix ? prefix + '\u00A0' : ''}${numberStr}${suffix ? '\u00A0' + suffix : ''}`;
}
export default roundNumber;

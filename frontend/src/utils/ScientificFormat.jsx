export const formatPriceSubscript = (value) => {
    if (value >= 0.01) {
        // Format normally for values >= 0.01
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }

    // Convert value to a fixed decimal format
    const decimalString = value.toFixed(10);
    const match = decimalString.match(/^0\.0(0+)(\d+)/);

    if (!match) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 4,
            maximumFractionDigits: 6,
        }).format(value);
    }

    const leadingZeros = match[1].length + 1; // Count leading zeros after `0.0`
    const significantDigits = match[2].slice(0, 4); // Keep first 4 significant digits

    return (
        <>
            $0.0<sub>{leadingZeros}</sub>{significantDigits}
        </>
    );
};

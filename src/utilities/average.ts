const average = (numbers: readonly number[]) =>
{
    if (numbers === undefined || numbers.length === 0)
    {
        return -1;
    }

    return parseFloat((numbers.reduce((a, b) => a + b) / numbers.length).toFixed(2));
};

export default average;
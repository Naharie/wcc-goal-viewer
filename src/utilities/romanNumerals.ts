const mapping = { 1: "I", 4: "IV", 5: "V", 9: "IX", 10: "X", 40: "XV", 50: "L", 90: "XC", 100: "C", 400: "CD", 500: "D", 900: "CM", 1000: "M" };
const values: [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ] = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];

export const toRomanNumerals = function (number: number)
{
    if (number < 1 || number > 3999)
    {
        throw new Error("When converting to Roman numerals, the number must be between 1 and 3999.");
    }

    let result = "";
    let index = 0;

    while (number > 0 && index < values.length)
    {
        while (number >= values[index])
        {
            result += mapping[values[index]];
            number -= values[index];
        }

        index++;
    }

    return result;
};
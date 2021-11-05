const mapping = {
    1: "I",

    4: "IV",
    5: "V",
    
    9: "IX",
    10: "X",

    40: "XL",
    45: "VL",
    49: "IL",
    50: "L",
    
    90: "XC",
    95: "VC",
    99: "IC",
    100: "C",
    
    400: "CD",
    450: "LD",
    490: "XD",
    495: "VD",
    499: "ID",
    500: "D",
    
    900: "CM",
    990: "XM",
    995: "VM",
    999: "IM",
    1000: "M"
};
// Why doesn't this method return (keyof T)[]?
const values = Object.keys(mapping).sort((a, b) => +b - +a) as unknown as (keyof typeof mapping)[];

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
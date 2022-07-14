export const fromRomanNumeral = function (numeral: string) {
    const symbols: Record<string, number> = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };

    let result = 0;

    for (let i = 0; i < numeral.length; i++) {
        const current = symbols[numeral[i]];
        const next = symbols[numeral[i + 1]];

        if (current < next) {
            result += next - current
            i++
        }
        else {
            result += current;
        }
    }

    return result;
};

export const toRomanNumeral = (number: number) => {
    const mapping: Record<string, number> = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let result = '';

    for (const key in mapping)
    {
        const repeatCounter = Math.floor(number / mapping[key]);

        if (repeatCounter !== 0)
        {
            result += key.repeat(repeatCounter);
        }

        number %= mapping[key];

        if (number === 0) return result;
    }

    return result;
};

export const nextRomanNumeral = (numeral: string) => toRomanNumeral(fromRomanNumeral(numeral) + 1);
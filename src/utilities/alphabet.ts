const lowercase: string[] = [];
const uppercase: string[] = [];

// Initialize the letter arrays

for (let i = 0; i < 26; i++)
{
    uppercase.push(String.fromCharCode(65 + i))
    lowercase.push(String.fromCharCode(97 + i));
}

const nextLetter = (sequence: string, characters: string[])  =>
{
    const alpha = characters[0];
    const zed = characters[25];

    for (let i = sequence.length - 1; i >= 0; i--)
    {
        const char = sequence[i];

        if (char < zed)
        {
            const nextChar = characters[characters.indexOf(char) + 1];
            return (sequence.substring(0, i) + nextChar + alpha.repeat(sequence.length - i - 1));
        }
    }

    // Sequence consisted solely of the character "z"
    return (alpha.repeat(sequence.length + 1));
};

export const nextLowercaseLetter = (sequence: string) => nextLetter(sequence, lowercase);
export const nextUppercaseLetter = (sequence: string) => nextLetter(sequence, uppercase);
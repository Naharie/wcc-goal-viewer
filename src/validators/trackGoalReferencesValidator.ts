import useHighlight from "../data/highlight";

const convertRomanNumeral = function(numeral: string)
{
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

    for (let i = 0; i < numeral.length; i++)
    {
        const current = symbols[numeral[i]];
        const next = symbols[numeral[i+1]];

        if (current < next)
        {
            result += next - current
            i++
        }
        else
        {
            result += current;
        }
    }

    return result; 
};

const validator = (references: string) =>
{
    const parts = references.split(";");
    const numerals = new Set([ "I", "V", "X", "L", "C", "D", "M" ]);

    const isLetter = (char: string) => char >= "a" && char <= "z";
    let lastValue = 0;

    for (let i = 0; i < parts.length; i++)
    {
        let part = parts[i];
        if (part.trim() === "" && i === parts.length - 1) continue;

        if (i > 0 && !part.startsWith(" "))
        {
            return ("Put exactly one space between a semicolon and the next reference.");
        }

        let hasNumeral = false;
        let [primaryGoal, childGoals] = ["", ""];

        // Check the curriculum goal reference.
        for (let j = 1; j < part.length; j++)
        {
            if (numerals.has(part[j]))
            {
                hasNumeral = true;
            }

            if (part[j] === " ")
            {
                if (hasNumeral)
                {
                    primaryGoal = part.substring(0, j).trim();
                    childGoals = part.substring(j + 1);
                    break;
                }

                return ("Put exactly one space between a semicolon and the next reference.");
            }
            else if (j === part.length - 1)
            {
                if (hasNumeral)
                {
                    primaryGoal = part.trim();
                    childGoals = "";
                    break;
                }

                return ("Put exactly one space between a semicolon and the next reference.");
            }
            else if (!numerals.has(part[j]))
            {
                return (`The character ${part[j]} is not valid; all curriculum goal references must be formed using Roman numerals.`);
            }
        }

        if (!Object.hasOwn(useHighlight.getState().curriculumGoals, primaryGoal))
        {
            return (`The reference ${primaryGoal} does not, but must, point to an existing curriculum goal.`);
        }

        const childParts = childGoals.split(",");

        for (let j = 0; j < childParts.length; j++)
        {
            let part = childParts[j];
            if (part === "") continue;

            if (j > 0 && !part.startsWith(" "))
            {
                return ("Put exactly one space between a comma and the next child reference.");
            }

            const reference = j === 0 ? part[0] : part[1];
            
            if ((j > 0 && part.length < 2) || part.length > 2 || !isLetter(reference))
            {
                return ("Child references must consist of exactly one space and one lowercase letter.");
            }
            
            if (!Object.hasOwn(useHighlight.getState().curriculumGoals[primaryGoal], reference))
            {
                return (`The reference ${primaryGoal} ${reference} does not, but must, point to an existing curriculum sub goal.`);
            }
        }

        let newValue = convertRomanNumeral(primaryGoal);

        if (newValue < lastValue)
        {
            debugger;
            return ("References must be sorted in ascending order.");
        }

        lastValue = newValue;
    }

    return true;
};

export default validator;
import useHighlight from "../data/highlight";
import { fromRomanNumeral } from "../utilities/roman-numerals";

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

        let [primaryGoal, ...childGoals] = part.split(" ");
        let childSegment = childGoals.join(" ");

        primaryGoal = primaryGoal.trim();

        for (let j = 0; j < primaryGoal.length; j++)
        {
            if (!numerals.has(primaryGoal[j]))
            {
                if (primaryGoal[j] === ",")
                {
                    return ("Top level references are separated by semicolons and not commas.");
                }

                return ("References must be formed using Roman numerals.");
            }
        }

        if (!Object.hasOwn(useHighlight.getState().curriculumGoals, primaryGoal))
        {
            return (`The reference ${primaryGoal} does not, but must, point to an existing curriculum goal.`);
        }

        const childParts = childSegment.split(",");

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

        let newValue = fromRomanNumeral(primaryGoal);

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
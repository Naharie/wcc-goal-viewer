import useHighlight from "../data/highlight";

const validator = (references: string) =>
{
    const parts = references.split(";");
    const numerals = new Set([ "I", "V", "X", "L", "C", "D", "M" ]);

    const isLetter = (char: string) => char >= "a" && char <= "z";

    for (let i = 0; i < parts.length; i++)
    {
        let part = parts[i];
        if (part === "") continue;

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
    }

    return true;
};

export default validator;
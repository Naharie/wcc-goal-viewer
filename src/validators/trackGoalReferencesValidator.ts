import { useHighlight } from "../data/highlight";
import { fromRomanNumeral } from "../utilities/roman-numerals";

const validator = (text: string) =>
{
    const references = text.split(";");

    const numerals = new Set([ "I", "V", "X", "L", "C", "D", "M" ]);
    const isLetter = (char: string) => char >= "a" && char <= "z";

    let lastValue = 0;

    for (let i = 0; i < references.length; i++)
    {
        const pieces = references[i].split(" ");
        
        if (i > 0)
        {
            if (pieces[0] !== "")
            {
                return ("Put exactly one space after each semicolon and before the next reference.");
            }

            pieces.splice(0, 1);
        }
        
        const reference = pieces[0];
        const subReferences = pieces.slice(1).join(" ").split(",");
        
        if (reference === "") continue;

        // Is made up of Roman Numerals
        if (!reference.split("").every(char => char === " " || numerals.has(char)))
        {
            return (`References must me composed using Roman numerals.`);
        }

        // Exists
        if (!Object.hasOwn(useHighlight.getState().curriculumGoals, reference))
        {
            return (`The reference ${reference} does not, but must, point to an existing curriculum goal.`);
        }
        
        // Sort in Ascending Order
        {
            let newValue = fromRomanNumeral(reference);

            if (newValue < lastValue)
            {
                debugger;
                return ("References must be sorted in ascending order.");
            }

            lastValue = newValue;
        }

        // Child References
        for (let i = 0; i < subReferences.length; i++)
        {
            let part = subReferences[i];
            if (part === "") continue;

            if (i > 0 && !part.startsWith(" "))
            {
                return ("Put exactly one space between a comma and the next child reference.");
            }

            const subReference = i === 0 ? part[0] : part[1];
            
            if ((i > 0 && part.length < 2) || part.length > 2 || !isLetter(subReference))
            {
                return ("Child references must consist of exactly one space and one lowercase letter.");
            }
            
            if (!Object.hasOwn(useHighlight.getState().curriculumGoals[reference], subReference))
            {
                return (`The reference ${reference} ${subReference} does not, but must, point to an existing curriculum sub goal.`);
            }
        }
    }

    return true;
};

export default validator;
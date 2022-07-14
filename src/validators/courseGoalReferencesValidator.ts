import useData from "../data";

const validator = (trackName: string) => (value: string): true | string =>
{
    const parts = value.split(",");
    const track = useData.getState().tracks.find(track => track.name === trackName);

    if (track === undefined)
    {
        return ("Something went wrong. Please reload the page to try again.");
    }

    for (let i = 0; i < parts.length; i++)
    {
        let part = parts[i];
        if (part.trim() === "" && i === parts.length - 1) continue;

        if (i > 0 && !part.startsWith(" ") || part[part.length - 1] === " ")
        {
            return ("Put exactly one space after a comma and before the next reference.");
        }

        const number = parseInt(part.trim());

        if (isNaN(number) || number <= 0)
        {
            return (`${part.trim()} is not a valid reference; all references must be numbers.`);
        }

        if (number > track.goals.length)
        {
            return (`${number} does not, but must, refer to an existing track goal.`)
        }
    }

    return true;
};

export default validator;
import { Highlight, Goal, HashMap } from "./highlight/modelds";
import { Atom, readAtom } from "./hooks/useAtom";
import { computeScores } from "./highlight";
import { JsonData } from "./models";

export type Assessment = Record<string, number[]>;

export const formAssessment = (highlight: Highlight) =>
{
    const assessment: Assessment = {};

    const handleSemester = (semester: HashMap<Goal>) =>
    {
        for (const id in semester)
        {
            const scores = semester[id].scores;

            if (scores.length > 0)
            {
                assessment[id] = scores;
            }
        }
    };

    for (const id in highlight.courses)
    {
        const course = highlight.courses[id];

        for (const year of course.years)
        {
            handleSemester(year.semester1);
            handleSemester(year.semester2);
        }
    }

    return (assessment);
};
export const applyAssessment = (assessment: Assessment, data: JsonData, _highlight: Atom<Highlight>) =>
{
    const [highlight, setHighlight] = readAtom(_highlight);

    const mapping =
        Object.values(highlight.courses)
            .flatMap(course => course.years)
            .flatMap(year => [year.semester1, year.semester2])
            .reduce((left, right) => Object.assign({}, left, right));

    for (const id in assessment)
    {
        mapping[id].scores = assessment[id];
    }

    setHighlight(computeScores(data, highlight));
};

export const parseAssessment = (value: string): Assessment =>
{
    try
    {
        const entries =
            value
                .split("~")
                .map(group =>
                {
                    const [id, value] = group.split("-");
                    const values =
                        value
                            .split("")
                            .map(value => parseInt(value))
                            .filter(value => !isNaN(value));

                    return ([id, values]);
                })
                .filter(([, values]) => values.length > 0);

        return (Object.fromEntries(entries));
    }
    catch (error)
    {
        console.error(error);
        return ({});
    }
};
export const stringifyAssessment = (value: Assessment) =>
{
    return (
        Object.entries(value)
            .map(([id, values]) => id + "-" + values.join(""))
            .join("~")
    );
};

export const updateAssessment = function (value: Highlight, setQuery: (value: Record<string, string | undefined>) => void)
{
    const assessment = formAssessment(value);
    const query = stringifyAssessment(assessment);

    setQuery(query === "" ? { assessment: undefined } : { assessment: query });
};
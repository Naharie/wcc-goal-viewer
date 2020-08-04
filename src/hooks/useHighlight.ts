import { useState } from "react";
import { Highlight, HashMap, HGoal, mapObject, cloneHPrimaryGoal, cloneHTrack } from "../highlight";
import useQuery from "./useQuery";

interface Assessment
{
    [key: string]: number[];
}

const useHighlight = (): [Highlight, (value: Highlight) => void] =>
{
    const [highlight, setHighlight] = useState<Highlight>({
        primaryGoals: {},
        tracks: {},
        courses: {}
    });
    //const [{ assessment: query = "" }, setQuery] = useQuery();
    const [lastSeenQuery, setLastSeenQuery] = useState("");

    const formAssessment = (highlight: Highlight) =>
    {
        const assessment: Assessment = {};

        const handleSemester = function (semester: HashMap<HGoal>)
        {
            for (const id in semester)
            {
                const scores = semester[id].scores ?? [];

                if (scores.length > 0)
                {
                    assessment[id] = scores;
                }
            }
        };

        // Manual loop instead of Object.values to avoid iterating over the collection twice.
        // Iteration doesn't take very long, but as the assessment is updated with every user click,
        // This function needs to be very fast.
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
    const applyAssessment = (assessment: Assessment) =>
    {
        const result: Highlight = {
            primaryGoals: highlight.primaryGoals,
            tracks: highlight.tracks,
            courses: highlight.courses
        };

        const mapping =
            Object.values (result.courses)
                .flatMap(course => course.years)
                .flatMap(year => [year.semester1, year.semester2])
                .reduce((left, right) => Object.assign({}, left, right));

        for (const id in assessment)
        {
            mapping[id].scores = assessment[id];
        }

        setHighlight(result);
    };

    const parseAssessment = (value: string): Assessment =>
    {
        const entries =
            value
                .split(",")
                .map(group =>
                {
                    const [id, valueText] = group.split(":");
                    const values = valueText.split("").map(parseInt).filter (value => !isNaN(value));

                    return ([ id, values ]);
                })
                .filter(([id, values]) => values.length > 0)

        return (Object.fromEntries(entries));
    };
    const stringifyAssessment = (value: Assessment) =>
    {
        return (
            Object.entries(value)
            .map(([ id, values ]) => id + ":" + values.join(""))
            .join(",")
        );
    };

    /*
    // The user entered a url with a query string and the specified query does not match the current internal state.
    if (query != lastSeenQuery)
    {
        const assessment = parseAssessment(query);

        setLastSeenQuery(query);
        applyAssessment(assessment);
    }

    const setter = (value: Highlight) =>
    {
        const assessment = formAssessment(value);
        const query = stringifyAssessment(assessment);

        setHighlight(value);

        setQuery(query === "" ? {} : { assessment: query });
        setLastSeenQuery(query);
    };
    */

    return ([ highlight, setHighlight ]);
};

export default useHighlight;
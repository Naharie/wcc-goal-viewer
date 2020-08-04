import React, { useState } from "react";
import PrimaryGoalPanel from "./PrimaryGoalPanel";
import TrackPanel from "./TrackPanel";
import CoursePanel from "./CoursePanel";
import ScrollWrapper from "./ScrollWrapper";
import LoadingScreen from "./LoadingScreen";
import { createHighlight, HPrimaryGoal, HTrack, HashMap, computeTrackHighlight, computeCourseHighlight, HCourse, computeScores, Highlight, HGoal, } from "../highlight";
import useData from "../hooks/useData";
import useQuery from "../hooks/useQuery";
import useInitialize from "../hooks/useInitialize";

interface Assessment
{
    [key: string]: number[];
}

const App = () =>
{
    const [highlight, _setHighlight] = useState<Highlight>({
        primaryGoals: {},
        tracks: {},
        courses: {}
    });
    const [{ assessment: query = "" }, setQuery] = useQuery();

    const formAssessment = (highlight: Highlight) =>
    {
        const assessment: Assessment = {};

        const handleSemester = (semester: HashMap<HGoal>) =>
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
            Object.values(result.courses)
                .flatMap(course => course.years)
                .flatMap(year => [year.semester1, year.semester2])
                .reduce((left, right) => Object.assign({}, left, right));

        for (const id in assessment)
        {
            mapping[id].scores = assessment[id];
        }

        _setHighlight(computeScores(data, result));
    };

    const parseAssessment = (value: string): Assessment =>
    {
        try
        {
            const entries =
                value
                    .split("~")
                    .map (group =>
                    {
                        const [id, value] = group.split("-");
                        const values = value.split("").map(value => parseInt(value)).filter(value => !isNaN(value));

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
    const stringifyAssessment = (value: Assessment) =>
    {
        return (
            Object.entries(value)
                .map(([id, values]) => id + "-" + values.join(""))
                .join("~")
        );
    };

    const [isLoading, data] = useData(data => _setHighlight(createHighlight(data)));

    useInitialize(() =>
    {
        if (!Object.keys(highlight.courses).length)
        {
            return (false);
        }

        if (query !== "")
        {
            const assessment = parseAssessment(query);
            applyAssessment(assessment);
        }

        return (true);
    });

    const setHighlight = (value: Highlight) =>
    {
        const assessment = formAssessment(value);
        const query = stringifyAssessment(assessment);

        _setHighlight(value);
        setQuery(query === "" ? {} : { assessment: query });
    };

    const setPrimaryGoalHighlight = function (value: HashMap<HPrimaryGoal>)
    {
        const updated = {
            primaryGoals: value,
            tracks: highlight.tracks,
            courses: highlight.courses
        };
        setHighlight(computeCourseHighlight(data, computeTrackHighlight(data, updated)));
    };
    const setTrackHighlight = function (value: HashMap<HTrack>)
    {
        const updated = {
            primaryGoals: highlight.primaryGoals,
            tracks: value,
            courses: highlight.courses
        };
        setHighlight(computeCourseHighlight(data, updated));
    };
    const setCourseHighlight = function (value: HashMap<HCourse>)
    {
        const updated = {
            primaryGoals: highlight.primaryGoals,
            tracks: highlight.tracks,
            courses: value
        };
        const computed = computeScores(data, updated);
        setHighlight(computed);
    };

    if (isLoading)
    {
        return (<LoadingScreen />);
    }

    return (
        <div className="flex mh-0 h-100">
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper>
                    <PrimaryGoalPanel goals={data.primaryGoals} highlight={highlight.primaryGoals} setHighlight={setPrimaryGoalHighlight} />
                </ScrollWrapper>
            </div>
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper className="pt-0-5">
                    <TrackPanel tracks={data.tracks} highlight={highlight.tracks} setHighlight={setTrackHighlight} />
                </ScrollWrapper>
            </div>
            <div className="flex-2 h-100">
                <ScrollWrapper className="pt-0-5">
                    <CoursePanel courses={data.courses} highlight={highlight.courses} setHighlight={setCourseHighlight} />
                </ScrollWrapper>
            </div>
        </div>
    );
};

export default App;
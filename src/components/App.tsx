import React, { useState } from "react";
import PrimaryGoalPanel from "./PrimaryGoalPanel";
import TrackPanel from "./TrackPanel";
import CoursePanel from "./CoursePanel";
import ScrollWrapper from "./ScrollWrapper";
import LoadingScreen from "./LoadingScreen";
import useData from "../hooks/useData";
import useQuery from "../hooks/useQuery";
import useInitialize from "../hooks/useInitialize";
import { Highlight, HashMap, Goal as HGoal } from "../highlight/modelds";
import { makeAtom, derive } from "../hooks/useAtom";
import { computeScores, createHighlight, computeTrackHighlight, computeCourseHighlight } from "../highlight";
import * as _ from "lodash";
import { update } from "lodash";

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
    const setHighlight = (value: Highlight | ((value: Highlight) => Highlight)) =>
    {
        if (typeof value === "function")
        {
            _setHighlight(current => value(current));
            return;
        }

        _setHighlight(value);
    };
    
    // Highlight/selection

    const updateAssessment = function (value: Highlight)
    {
        const assessment = formAssessment(value);
        const query = stringifyAssessment(assessment);

        setQuery(query === "" ? {assessment: undefined } : { assessment: query });
    };

    const selection = makeAtom(highlight, setHighlight);
    const primaryGoals = derive(selection, "primaryGoals", (_, value) =>
    {
        return (
            computeCourseHighlight (
                data,
                computeTrackHighlight(data, value)
            )
        );
    });
    const tracks = derive(selection, "tracks", (_, value) =>
    {
        return computeCourseHighlight(data, value);
    });
    const courses = derive(selection, "courses", (_, value) =>
    {
        updateAssessment(value);
        return computeScores(data, value);
    });

    // Assesments

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
        const mapping =
            Object.values(highlight.courses)
                .flatMap(course => course.years)
                .flatMap(year => [year.semester1, year.semester2])
                .reduce((left, right) => Object.assign({}, left, right));

        for (const id in assessment)
        {
            mapping[id].scores = assessment[id];
        }

        _setHighlight(computeScores(data, highlight));
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

    // Data setup

    const [isLoading, data] = useData(data => _setHighlight(createHighlight(data)));

    useInitialize(() =>
    {
        if (_.isEmpty(highlight.courses))
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

    if (isLoading)
    {
        return (<LoadingScreen />);
    }

    return (
        <div className="flex mh-0 h-100">
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper>
                    <PrimaryGoalPanel goals={data.primaryGoals} highlight={primaryGoals} />
                </ScrollWrapper>
            </div>
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper className="pt-0-5">
                    <TrackPanel tracks={data.tracks} highlight={tracks} />
                </ScrollWrapper>
            </div>
            <div className="flex-2 h-100">
                <ScrollWrapper className="pt-0-5">
                    <CoursePanel courses={data.courses} highlight={courses} />
                </ScrollWrapper>
            </div>
        </div>
    );
};

export default App;
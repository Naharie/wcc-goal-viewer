import React, { useState, useMemo } from "react";
import PrimaryGoalPanel from "./PrimaryGoalPanel";
import TrackPanel from "./TrackPanel";
import CoursePanel from "./CoursePanel";
import ScrollWrapper from "./ScrollWrapper";
import LoadingScreen from "./LoadingScreen";
import useData from "../hooks/useData";
import useQuery from "../hooks/useQuery";
import useInitialize from "../hooks/useInitialize";
import { Highlight } from "../highlight/modelds";
import { makeAtom, derive } from "../hooks/useAtom";
import { computeScores, createHighlight, computeTrackHighlight, computeCourseHighlight } from "../highlight";
import * as _ from "lodash";
import { updateAssessment, parseAssessment, applyAssessment } from "../assessment";

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
    
    // Assesments

    const [{ assessment: query = "" }, setQuery] = useQuery();

    // Highlight/selection

    const selection = makeAtom(highlight, setHighlight);
    const primaryGoals = derive(selection, "primaryGoals", (_, value) => computeCourseHighlight (data, computeTrackHighlight(data, value)));
    const tracks = derive(selection, "tracks", (_, value) => computeCourseHighlight(data, value));
    const courses = derive(selection, "courses", (_, value) =>
    {
        updateAssessment(value, setQuery);
        return computeScores(data, value);
    });

    // Data setup

    const [isLoading, data, setData] = useData(data => _setHighlight(createHighlight(data)));
    const original = useMemo(() => _.cloneDeep(data), [ data ]);

    useInitialize(() =>
    {
        if (_.isEmpty(highlight.courses))
        {
            return (false);
        }

        if (query !== "")
        {
            applyAssessment(parseAssessment(query), data, selection);
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
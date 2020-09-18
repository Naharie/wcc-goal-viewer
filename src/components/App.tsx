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
import { makeAtom, derive, useAtom } from "../hooks/useAtom";
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

    // Assesments

    const [{ assessment: query = "" }, setQuery] = useQuery();

    // Highlight/selection

    const selection = makeAtom(highlight, _setHighlight);
    const primaryGoals = derive(selection, "primaryGoals", (_, value) => computeCourseHighlight (_data, computeTrackHighlight(_data, value)));
    const tracks = derive(selection, "tracks", (_, value) => computeCourseHighlight(_data, value));
    const courses = derive(selection, "courses", (_, value) =>
    {
        updateAssessment(value, setQuery);
        return computeScores(_data, value);
    });

    // Data setup

    const [isLoading, _data, _setData] = useData(data => _setHighlight(createHighlight(data)));
    const data = makeAtom(_data, _setData);
    const original = useMemo(() => _.cloneDeep(_data), [ _data ]);

    useInitialize(() =>
    {
        if (_.isEmpty(highlight.courses))
        {
            return (false);
        }

        if (query !== "")
        {
            applyAssessment(parseAssessment(query), _data, selection);
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
                    <PrimaryGoalPanel goals={_data.primaryGoals} highlight={primaryGoals} />
                </ScrollWrapper>
            </div>
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper className="pt-0-5">
                    <TrackPanel tracks={_data.tracks} highlight={tracks} />
                </ScrollWrapper>
            </div>
            <div className="flex-2 h-100">
                <ScrollWrapper className="pt-0-5">
                    <CoursePanel courses={_data.courses} highlight={courses} />
                </ScrollWrapper>
            </div>
        </div>
    );
};

export default App;
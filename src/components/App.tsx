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
import { EditEnv } from "../models/environment";
import { difference } from "../utilities/difference";

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
    const primaryGoals = derive(selection, "primaryGoals", (_, value) => computeCourseHighlight(_data, computeTrackHighlight(_data, value)));
    const tracks = derive(selection, "tracks", (_, value) => computeCourseHighlight(_data, value));
    const courses = derive(selection, "courses", (_, value) =>
    {
        updateAssessment(value, setQuery);
        return computeScores(_data, value);
    });

    // Data setup

    const [isLoading, _data, _ref] = useData(data => _setHighlight(createHighlight(data)));
    const data = makeAtom(_ref.current, v => _ref.current = typeof v === "function" ? v (_ref.current) : v);
    const original = useMemo(() => _.cloneDeep(_data), [_data]);

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

    const editEnv: EditEnv = {
        updateDiff: () => console.log(difference(original, data.get))
    };

    return (
        <div className="flex mh-0 h-100">
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper>
                    <PrimaryGoalPanel goals={derive(data, "primaryGoals")} highlight={primaryGoals} env={editEnv} />
                </ScrollWrapper>
            </div>
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper className="pt-0-5">
                    <TrackPanel tracks={derive(data, "tracks")} highlight={tracks} env={editEnv} />
                </ScrollWrapper>
            </div>
            <div className="flex-2 h-100">
                <ScrollWrapper className="pt-0-5">
                    <CoursePanel courses={derive(data, "courses")} highlight={courses} env={editEnv} />
                </ScrollWrapper>
            </div>
        </div>
    );
};

export default App;
import React, { useState } from "react";
import PrimaryGoalPanel from "./PrimaryGoalPanel";
import TrackPanel from "./TrackPanel";
import CoursePanel from "./CoursePanel";
import ScrollWrapper from "./ScrollWrapper";
import LoadingScreen from "./LoadingScreen";
import { createHighlight, HPrimaryGoal, HTrack, HashMap, computeTrackHighlight, computeCourseHighlight, HCourse, computeScores, Highlight } from "../highlight";
import useData from "../hooks/useData";
import useHighlight from "../hooks/useHighlight";

const App = () =>
{
    const [highlight, setHighlight] = useHighlight();
    const [isLoading, data] = useData(data => setHighlight(createHighlight(data)));

    const setPrimaryGoalHighlight = function (value: HashMap<HPrimaryGoal>)
    {
        const updated = {
            primaryGoals: value,
            tracks: highlight.tracks,
            courses: highlight.courses
        };
        setHighlight (computeCourseHighlight(data, computeTrackHighlight(data, updated)));
    };
    const setTrackHighlight = function (value: HashMap<HTrack>)
    {
        const updated = {
            primaryGoals: highlight.primaryGoals,
            tracks: value,
            courses: highlight.courses
        };
        setHighlight (computeCourseHighlight(data, updated));
    };
    const setCourseHighlight = function (value: HashMap<HCourse>)
    {
        const updated = {
            primaryGoals: highlight.primaryGoals,
            tracks: highlight.tracks,
            courses: value
        };
        const computed = computeScores(data, updated);

        setHighlight (computed);
    };

    if (isLoading)
    {
        return (<LoadingScreen />)
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
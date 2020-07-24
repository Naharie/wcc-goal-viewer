import React, { useState, useEffect } from "react";
import PrimaryGoalPanel from "./PrimaryGoalPanel";
import TrackPanel from "./TrackPanel";
import CoursePanel from "./CoursePanel";
import ScrollWrapper from "./ScrollWrapper";
import { Highlight, createHighlight, HPrimaryGoal, HTrack } from "../highlight";
import LoadingScreen from "./LoadingScreen";

const App = () =>
{
    const [data, setData] = useState<JsonData>({
        primaryGoals: [],
	    tracks: [],
	    courses: []
    });
    const [highlight, setHighlight] = useState<Highlight>({
        primaryGoals: [],
        tracks: [],
        courses: []
    });
    const [isLoading, setLoading] = useState(true);

    useEffect (() =>
    {
        // No need to use an abort controller here.
        // The primary app component is always mounted until the page is closed.
        fetch("./data.json")
            .then(response => response.json())
            .then(data =>
            {
                setData(data);
                setHighlight(createHighlight(data));
                setLoading(false);
            });
    }, []);

    const setHPrimaryGoals = function (value: HPrimaryGoal[])
    {
        setHighlight ({
            primaryGoals: value,
            tracks: highlight.tracks,
            courses: highlight.courses
        });
    };
    const setHTracks = function (value: HTrack[])
    {
        setHighlight ({
            primaryGoals: highlight.primaryGoals,
            tracks: value,
            courses: highlight.courses
        });
    };

    if (isLoading)
    {
        return (<LoadingScreen />)
    }

    return (
        <div className="flex mh-0 h-100">
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper>
                    <PrimaryGoalPanel goals={data.primaryGoals} highlight={highlight.primaryGoals} setHighlight={setHPrimaryGoals} />
                </ScrollWrapper>
            </div>
            <div className="flex-1 h-100 border-r-1">
                <ScrollWrapper className="pt-0-5">
                    <TrackPanel tracks={data.tracks} highlight={highlight.tracks} setHighlight={setHTracks} />
                </ScrollWrapper>
            </div>
            <div className="flex-2 h-100">
                <ScrollWrapper className="pt-0-5">
                    <CoursePanel courses={data.courses} />
                </ScrollWrapper>
            </div>
        </div>
    );
};

export default App;
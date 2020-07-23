import React, { useState, useEffect } from "react";
import PrimaryGoalPanel from "./PrimaryGoalPanel";
import TrackPanel from "./TrackPanel";

const App = () =>
{
    const [data, setData] = useState<JsonData>({
        primaryGoals: [],
	    tracks: [],
	    courses: []
    });

    useEffect (() =>
    {
        // No need to use an abort controller here.
        // The primary app component is always mounted until the page is closed.
        // The clean up code won't run anyway then, so why bother?
        fetch("./data.json")
            .then(response => response.json())
            .then(setData);
    }, []);

    return (
        <div className="flex mh-0 h-100">
            <div className="flex-1 mh-0 h-100 overflow-hidden border-r-1">
                <div className="w-100 mh-0 h-100 overflow-y-scroll scroll-hover">
                    <PrimaryGoalPanel goals={data.primaryGoals} />
                </div>
            </div>
            <div className="flex-1 h-100 border-r-1">
                <div className="w-100 mh-0 h-100 overflow-y-scroll scroll-hover pt-0-5">
                    <TrackPanel tracks={data.tracks} />
                </div>
            </div>
            <div className="flex-2 h-100"></div>
        </div>
    );
};

export default App;
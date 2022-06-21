import React, { useRef } from "react";
import { selectTracks } from "../data";
import { useAppSelector } from "../hooks/redux";
import SimpleBar from "simplebar-react";
import TrackPanel from "./TrackPanel";

const TrackGoalPanel = () =>
{
    const tracks = useAppSelector(selectTracks);
    const scrollable = useRef<HTMLElement>();
    const lastTrack = useRef<HTMLDivElement>(null);
    
    // Determine the number of tracks that should rerender at the bottom.

    let loopCount = 0;
    let loopGoals = 16;

    while (loopGoals > 0 && loopCount < tracks.length)
    {
        loopGoals -= tracks[loopCount].goals.length;
        loopCount++;
    }

    const realTracks =
        tracks.map((_, index) =>
            <TrackPanel
                key={index} track={index}
                ref={index === tracks.length - 1 ? lastTrack : undefined}
            />
        );

    // Listen for scroll events

    if (scrollable.current)
    {
        scrollable.current.onscroll = () =>
        {
            if (!scrollable.current || !lastTrack.current) return;

            const bottom = lastTrack.current.getBoundingClientRect().bottom;

            if (bottom < 0)
            {
                scrollable.current.scrollTop = Math.abs(bottom);
            }
        };
    }

    return (
        <SimpleBar scrollableNodeProps={{ ref: scrollable }} style={{ maxHeight: "100%", padding: "1.3em 2em 1.3em 0" }}>
            {realTracks}
            {
                tracks.slice(0, loopCount).map((_, index) =>
                    <TrackPanel key={index} track={index} offset="-loop" />
                )
            }
        </SimpleBar>
    );
};

export default TrackGoalPanel;
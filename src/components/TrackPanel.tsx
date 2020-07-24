import React from "react";
import Track from "./Track";
import { HTrack, cloneHTrack } from "../highlight";

interface TrackPanelProps
{
    tracks: Track[];
    highlight: HTrack[];
    setHighlight: (value: HTrack[]) => void;
}

const TrackPanel = ({ tracks, highlight, setHighlight }: TrackPanelProps) =>
{
    const setTrackHighlight = function (value: HTrack)
    {
        setHighlight(highlight.map(track => track.track === value.track ? value : track));
    };

    return (
        <>
            {
                tracks.map((track, index) =>
                    <Track
                        key={track.track}
                        track={track}
                        className={index < tracks.length - 1 ? "border-b-1" : ""}
                        highlight={cloneHTrack(highlight[index])}
                        setHighlight={setTrackHighlight}
                    />
                )
            }
        </>
    );
};

export default TrackPanel;
import React from "react";
import Track from "./Track";
import { HTrack, cloneHTrack, HashMap } from "../highlight";

interface TrackPanelProps
{
    tracks: Track[];
    highlight: HashMap<HTrack>;
    setHighlight: (value: HashMap<HTrack>) => void;
}

const TrackPanel = ({ tracks, highlight, setHighlight }: TrackPanelProps) =>
{
    const setTrackHighlight = function (value: HTrack)
    {
        highlight[value.track] = value;
        setHighlight(highlight);
    };

    return (
        <>
            {
                tracks.map((track, index) =>
                    <Track
                        key={track.track}
                        track={track}
                        className={index < tracks.length - 1 ? "border-b-1" : ""}
                        highlight={cloneHTrack(highlight[track.track])}
                        setHighlight={setTrackHighlight}
                    />
                )
            }
        </>
    );
};

export default TrackPanel;
import React from "react";
import Track from "./Track";

interface TrackPanelProps
{
    tracks: Track[];
}

const TrackPanel = ({ tracks }: TrackPanelProps) =>
    <>
        {
            tracks.map((track, index) =>
                <Track key={track.track} track={track} className={index < tracks.length - 1 ? "border-b-1" : ""} />
            )
        }
    </>;

export default TrackPanel;
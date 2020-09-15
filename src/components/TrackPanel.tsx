import React from "react";
import Track from "./Track";
import { Track as HTrack, HashMap } from "../highlight/modelds";
import { Track as MTrack } from "../models";
import { DerivedAtom, derive } from "../hooks/useAtom";

interface TrackPanelProps
{
    tracks: MTrack[];
    highlight: DerivedAtom<HashMap<HTrack>>;
}

const TrackPanel = ({ tracks, highlight }: TrackPanelProps) =>
{
    return (
        <>
            {
                tracks.map((track, index) =>
                    <Track
                        key={track.track}
                        track={track}
                        className={index < tracks.length - 1 ? "border-b-1" : ""}
                        highlight={derive(highlight, track.track)}
                    />
                )
            }
        </>
    );
};

export default TrackPanel;
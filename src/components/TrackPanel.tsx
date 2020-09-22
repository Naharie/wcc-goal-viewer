import React from "react";
import Track from "./Track";
import { Track as HTrack, HashMap } from "../highlight/modelds";
import { Track as MTrack } from "../models";
import { DerivedAtom, derive } from "../hooks/useAtom";
import { EditEnv } from "../models/environment";

interface TrackPanelProps
{
    tracks: DerivedAtom<MTrack[]>;
    highlight: DerivedAtom<HashMap<HTrack>>;
    env: EditEnv;
}

const TrackPanel = ({ tracks, highlight, env }: TrackPanelProps) =>
{
    return (
        <>
            {
                tracks.get.map((track, index) =>
                    <Track
                        key={track.track}
                        track={derive(tracks, index)}
                        className={index < tracks.get.length - 1 ? "border-b-1" : ""}
                        highlight={derive(highlight, track.track)}
                        env={env}
                    />
                )
            }
        </>
    );
};

export default TrackPanel;
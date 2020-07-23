import React from "react";
import TrackGoal from "./TrackGoal";

interface TrackProps
{
    track: Track;
    className?: string;
}

const Track = ({ track, className }: TrackProps) =>
    <div id={"track_" + track.track} className={"mb-1" + (className ? " " + className : "")}>
        <div className="text-center cursor-pointer">{track.track}</div>
        <ol type="1">
            {
                track.goals.map(goal => <TrackGoal key={goal.id} goal={goal} />)
            }
        </ol>
    </div>;

export default Track;
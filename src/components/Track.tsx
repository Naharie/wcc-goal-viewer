import React from "react";
import TrackGoal from "./TrackGoal";
import { HTrack } from "../highlight";
import { list } from "../utilities";

interface TrackProps
{
    track: Track;
    className?: string;
    highlight: HTrack;
    setHighlight: (value: HTrack) => void;
}

const Track = ({ track, className, highlight, setHighlight }: TrackProps) =>
{
    const toggleSelected = function (id: string)
    {
        const goal = highlight.goals[id];

        goal.selected = !goal.selected;
        setHighlight(highlight);
    };

    return (
        <div id={"track_" + track.track} className={list("mb-1" + className)}>
            <div className="text-center cursor-pointer">{track.track}</div>
            <ol type="1">
                {
                    track.goals.map(goal =>
                        <TrackGoal
                            key={goal.id}
                            goal={goal}
                            selected={highlight.goals[goal.id].selected}
                            setSelected={() => toggleSelected(goal.id)}
                        />
                    )
                }
            </ol>
        </div>
    );
};

export default Track;
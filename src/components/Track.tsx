import React from "react";
import TrackGoal from "./TrackGoal";
import { HTrack } from "../highlight";
import { list, getNextCourse, scrollIntoView } from "../utilities";

interface TrackProps
{
    track: Track;
    className?: string;
    highlight: HTrack;
    setHighlight: (value: HTrack) => void;
}

const Track = ({ track, className, highlight, setHighlight }: TrackProps) =>
{
    const scrollToNext = function ()
    {
        const next = getNextCourse(track.track);
        const behavior: ScrollIntoViewOptions = {
            behavior: "smooth",
            block: "start",
            inline: "start"
        };

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };
    const toggleSelected = function (id: string)
    {
        const goal = highlight.goals[id];

        goal.selected = !goal.selected;
        setHighlight(highlight);
    };

    return (
        <div id={"track_" + track.track} className={list("mb-1" + className)}>
            <div className="text-center cursor-pointer" onClick={scrollToNext}>{track.track}</div>
            <ol type="1">
                {
                    track.goals.map(goal =>
                        <TrackGoal
                            key={goal.id}
                            goal={goal}
                            scores={highlight.goals[goal.id].scores}
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
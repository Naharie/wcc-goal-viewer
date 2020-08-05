import React from "react";
import TrackGoal from "./TrackGoal";
import { HTrack, HGoal, cloneHGoal } from "../highlight";
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

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };
    const setGoalHighlight = function (goal: HGoal)
    {
        highlight.goals[goal.id] = goal;
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
                            highlight={cloneHGoal (highlight.goals[goal.id])}
                            setHighlight={setGoalHighlight}
                        />
                    )
                }
            </ol>
        </div>
    );
};

export default Track;
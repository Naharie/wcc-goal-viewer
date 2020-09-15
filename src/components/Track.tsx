import React from "react";
import TrackGoal from "./TrackGoal";
import { Track as HTrack, Goal } from "../highlight/modelds";
import { Track } from "../models";
import { getNextCourse, scrollIntoView } from "../utilities/scrolling";
import { list } from "../utilities/css";
import useCanEdit from "../hooks/useCanEdit";
import AddButton from "./AddButton";
import { derive, DerivedAtom } from "../hooks/useAtom";

interface TrackProps
{
    track: Track;
    className?: string;
    highlight: DerivedAtom<HTrack>;
}

const Track = ({ track, className, highlight }: TrackProps) =>
{
    const canEdit = useCanEdit();
    const goals = derive(highlight, "goals");

    const scrollToNext = function ()
    {
        const next = getNextCourse(track.track);

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
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
                            highlight={derive(goals, goal.id)}
                        />
                    )
                }
            </ol>
            {canEdit ? <AddButton /> : null}
        </div>
    );
};

export default Track;
import React from "react";
import TrackGoal from "./TrackGoal";
import { Track as HTrack, Goal } from "../highlight/modelds";
import { Track as MTrack } from "../models";
import { getNextCourse, scrollIntoView } from "../utilities/scrolling";
import { list } from "../utilities/css";
import useCanEdit from "../hooks/useCanEdit";
import AddButton from "./AddButton";
import { derive, DerivedAtom } from "../hooks/useAtom";
import { EditEnv } from "../models/environment";

interface TrackProps
{
    track: DerivedAtom<MTrack>;
    className?: string;
    highlight: DerivedAtom<HTrack>;
    env: EditEnv;
}

const Track = ({ track, className, highlight, env }: TrackProps) =>
{
    const canEdit = useCanEdit();
    const trackId = track.get.track;
    const hGoals = derive(highlight, "goals");
    const goals = derive(track, "goals");

    const scrollToNext = function ()
    {
        const next = getNextCourse(trackId);

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };
    
    return (
        <div id={"track_" + trackId} className={list("mb-1" + className)}>
            <div className="text-center cursor-pointer" onClick={scrollToNext}>{trackId}</div>
            <ol type="1">
                {
                    track.get.goals.map((goal, index) =>
                        <TrackGoal
                            key={goal.id}
                            goal={derive(goals, index)}
                            highlight={derive(hGoals, goal.id)}
                            env={env}
                        />
                    )
                }
            </ol>
            {canEdit ? <AddButton /> : null}
        </div>
    );
};

export default Track;
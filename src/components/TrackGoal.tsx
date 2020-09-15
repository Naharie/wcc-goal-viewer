import React from "react";
import { Goal } from "../highlight/modelds";
import { TrackGoal as MTrackGoal, PrimaryReference } from "../models";
import GoalElement from "./GoalElement";
import { DerivedAtom, readAtom } from "../hooks/useAtom";

interface TrackGoalProps
{
    goal: MTrackGoal;
    highlight: DerivedAtom<Goal>;
}

const renderReferences = (refs: PrimaryReference[]) =>
{
    if (refs.length === 0)
    {
        return ("");
    }

    const text =
        refs.map(ref =>
            [ ref.goal, ref.subGoals.join(", ") ].join(" ")
        ).join("; ");

    return ("(" + text + ")");
};

const TrackGoal = ({ goal, highlight }: TrackGoalProps) =>
{
    const [selected, setSelected] = readAtom(highlight);

    const toggleSelection = () => setSelected({ selected: !selected.selected });
    return (
        <GoalElement goal={goal} highlight={selected} onClick={toggleSelection}>
            {renderReferences(goal.references)}
        </GoalElement>
    )
};

export default TrackGoal;
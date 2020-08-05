import React from "react";
import { HGoal } from "../highlight";
import GoalElement from "./GoalElement";

interface TrackGoalProps
{
    goal: TrackGoal;
    highlight: HGoal;
    setHighlight: (value: HGoal) => void;
}

const renderReferences = (references: PrimaryReference[]) =>
{
    if (references.length === 0)
    {
        return ("");
    }

    const text =
        references.map(reference =>
            reference.subGoals.length === 0 ?
                reference.goal :
                reference.goal + " " + reference.subGoals.join(", ")
        ).join("; ");

    return ("(" + text + ")");
};

const TrackGoal = ({ goal, highlight, setHighlight }: TrackGoalProps) =>
{
    const toggleSelection = () =>
    {
        highlight.selected = !highlight.selected;
        setHighlight(highlight);
    };
    return (
        <GoalElement goal={goal} highlight={highlight} onClick={toggleSelection}>
            {renderReferences(goal.references)}
        </GoalElement>
    )
};

export default TrackGoal;
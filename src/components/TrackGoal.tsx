import React from "react";
import { list } from "../utilities";

interface TrackGoalProps
{
    goal: TrackGoal;
    selected: boolean;
    setSelected: (value: boolean) => void;
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

const TrackGoal = ({ goal, selected, setSelected } : TrackGoalProps) =>
    <li
        key={goal.id}
        className={list("mb-1-3", selected ? "selected" : "")}
        onClick={() => setSelected(!selected)}
    >
        {goal.text} {renderReferences(goal.references)}
    </li>;

export default TrackGoal;
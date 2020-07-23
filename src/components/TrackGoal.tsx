import React from "react";

interface TrackGoalProps
{
    goal: TrackGoal;
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

const TrackGoal = ({ goal } : TrackGoalProps) =>
    <li key={goal.id} className="mb-1-3">{goal.text} {renderReferences(goal.references)}</li>;

export default TrackGoal;
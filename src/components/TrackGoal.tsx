import React from "react";
import { list } from "../utilities";
import ScoreList from "./ScoreList";
import Textbox from "./Textbox";

interface TrackGoalProps
{
    goal: TrackGoal;
    scores: number[] | undefined;
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

const TrackGoal = ({ goal, scores, selected, setSelected }: TrackGoalProps) =>
{
    const toggleSelection = (event: React.MouseEvent<HTMLLIElement>) =>
    {
        if (event.target !== event.currentTarget)
        {
            return;
        }

        setSelected(!selected);
    }

    return (
        <li
            key={goal.id}
            className={list("mb-1-3", selected ? "selected" : "")}
            onClick={toggleSelection}
        >
            <Textbox text={goal.text} selected={selected} isEditing={false} /> {renderReferences(goal.references)}
            <ScoreList scores={scores} />
        </li>
    );
};

export default TrackGoal;
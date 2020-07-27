import React, { FC, useState } from "react";
import { HGoal } from "../highlight";
import { list } from "../utilities";
import ScoreList from "./ScoreList";

interface CourseGoalProps
{
    goal: CourseGoal;
    highlight: HGoal;
    setHighlight: (value: HGoal) => void;
}

const renderReferences = (references: string[]) =>
{
    return (references.length === 0 ? "" : "(" + references.join(", ") + ")");
};

const CourseGoal: FC<CourseGoalProps> = ({ goal, highlight, setHighlight }) =>
{
    const [editingScore, setEditingScore] = useState(false);

    const toggleEditingScore = (event: React.MouseEvent<HTMLLIElement>) =>
    {
        if (event.currentTarget !== event.target)
        {
            return;
        }

        setEditingScore(!editingScore)
    };
    const setScores = (value: number[]) =>
    {
        highlight.scores = value;
        setHighlight(highlight);
    }

    return (
        <li className={list("mb-1-3", highlight.selected ? "selected" : "")} onClick={toggleEditingScore}>
            {goal.text} {renderReferences(goal.references)}
            
            <ScoreList
                scores={highlight.scores}
                isEditing={editingScore}
                setScores={setScores}
            />
        </li>
    );
};

export default CourseGoal;
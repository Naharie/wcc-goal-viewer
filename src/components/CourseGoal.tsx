import React, { FC, useState, useRef } from "react";
import { HGoal } from "../highlight";
import { list } from "../utilities";
import ScoreList from "./ScoreList";
import Textbox from "./Textbox";
import GoalElement from "./GoalElement";

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
        if (event.target === event.currentTarget)
        {
            setEditingScore(!editingScore);
        }
    };
    const setScores = (value: number[]) =>
    {
        highlight.scores = value;
        setHighlight(highlight);
    };

    return (
        <GoalElement
            goal={goal}
            highlight={highlight}
            onClick={toggleEditingScore}
            isEditingScores={editingScore}
            setScores={setScores}
        >
         {renderReferences(goal.references)}
        </GoalElement>
    );
};

export default CourseGoal;
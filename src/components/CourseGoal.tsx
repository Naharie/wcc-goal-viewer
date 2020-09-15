import React, { FC, useState } from "react";
import { Goal } from "../highlight/modelds";
import { CourseGoal } from "../models";
import GoalElement from "./GoalElement";

interface CourseGoalProps
{
    goal: CourseGoal;
    highlight: Goal;
    setHighlight: (value: Goal) => void;
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
import React, { FC, useState } from "react";
import { Goal } from "../highlight/modelds";
import { CourseGoal as MCourseGoal } from "../models";
import GoalElement from "./GoalElement";
import { readAtom, DerivedAtom } from "../hooks/useAtom";

interface CourseGoalProps
{
    goal: MCourseGoal;
    highlight: DerivedAtom<Goal>
}

const renderReferences = (references: string[]) =>
{
    return (references.length === 0 ? "" : `(${references.join(", ")})`);
};

const CourseGoal: FC<CourseGoalProps> = ({ goal, highlight }) =>
{
    const [editingScore, setEditingScore] = useState(false);
    const [selected, setSelected] = readAtom(highlight);
    
    const toggleEditingScore = (event: React.MouseEvent<HTMLLIElement>) =>
    {
        if (event.target === event.currentTarget)
        {
            setEditingScore(!editingScore);
        }
    };
    const setScores = (value: number[]) =>
    {
        setSelected({ scores: value });
    };

    return (
        <GoalElement
            goal={goal}
            highlight={selected}
            onClick={toggleEditingScore}
            isEditingScores={editingScore}
            setScores={setScores}
        >
         {renderReferences(goal.references)}
        </GoalElement>
    );
};

export default CourseGoal;
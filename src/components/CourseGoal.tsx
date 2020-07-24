import React, { FC } from "react";
import { HGoal } from "../highlight";
import { list } from "../utilities";

interface CourseGoalProps
{
    goal: CourseGoal;
    highlight: HGoal;
}

const renderReferences = (references: string[]) =>
{
    return (references.length === 0 ? "" : "(" + references.join(", ") + ")");
};

const CourseGoal: FC<CourseGoalProps> = ({ goal, highlight }) =>
{
    return (
        <li className={list("mb-1-3", highlight.selected ? "selected" : "")}>
            {goal.text} {renderReferences(goal.references)}
        </li>
    );
};

export default CourseGoal;
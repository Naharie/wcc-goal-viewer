import React from "react";

interface PrimaryGoalProps
{
    goal: PrimaryGoal;
}

const PrimaryGoal = ({ goal }: PrimaryGoalProps) =>
    <li className="mb-1-3 mb-0-1">
        {goal.text}
        {
            <ol type="a">
                {
                    goal.children.map(child =>
                        <li key={child.id} className="mb-0-1">{child.text}</li>
                    )
                }
            </ol>
        }
    </li>;

export default PrimaryGoal;
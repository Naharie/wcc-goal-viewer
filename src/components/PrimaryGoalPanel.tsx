import React, { FC } from "react";
import PrimaryGoal from "./PrimaryGoal";
import { HPrimaryGoal, cloneHPrimaryGoal } from "../highlight";

interface PrimaryGoalPanelProps
{
    goals: PrimaryGoal[];
    // Guaranteed to be in the same order as goals.
    highlight: HPrimaryGoal[];
    updateHighlight: (value: HPrimaryGoal[]) => void;
}

const PrimaryGoalPanel: FC<PrimaryGoalPanelProps> = ({ goals, highlight, updateHighlight }) =>
{
    const updateGoalHighlight = function (value: HPrimaryGoal)
    {
        updateHighlight(highlight.map(goal => goal.id === value.id ? value : goal));
    };

    return (
        <ol type="I">
            {goals.map((goal, index) =>
                <PrimaryGoal
                    key={goal.id}
                    goal={goal}
                    highlight={cloneHPrimaryGoal(highlight[index])}
                    updateHighlight={updateGoalHighlight}
                />
            )}
        </ol>
    );
};

export default PrimaryGoalPanel;
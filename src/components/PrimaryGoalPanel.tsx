import React, { FC } from "react";
import PrimaryGoal from "./PrimaryGoal";
import { HPrimaryGoal, cloneHPrimaryGoal } from "../highlight";

interface PrimaryGoalPanelProps
{
    goals: PrimaryGoal[];
    // Guaranteed to be in the same order as goals.
    highlight: HPrimaryGoal[];
    setHighlight: (value: HPrimaryGoal[]) => void;
}

const PrimaryGoalPanel: FC<PrimaryGoalPanelProps> = ({ goals, highlight, setHighlight }) =>
{
    const updateGoalHighlight = function (value: HPrimaryGoal)
    {
        setHighlight(highlight.map(goal => goal.id === value.id ? value : goal));
    };

    return (
        <ol type="I">
            {goals.map((goal, index) =>
                <PrimaryGoal
                    key={goal.id}
                    goal={goal}
                    highlight={cloneHPrimaryGoal(highlight[index])}
                    setHighlight={updateGoalHighlight}
                />
            )}
        </ol>
    );
};

export default PrimaryGoalPanel;
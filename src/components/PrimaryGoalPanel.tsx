import React from "react";
import PrimaryGoal from "./PrimaryGoal";

interface PrimaryGoalPanelProps
{
    goals: PrimaryGoal[];
}

const PrimaryGoalPanel = ({ goals }: PrimaryGoalPanelProps) =>
    <ol type="I">
        {goals.map(goal => <PrimaryGoal key={goal.id} goal={goal} />)}
    </ol>;

export default PrimaryGoalPanel;
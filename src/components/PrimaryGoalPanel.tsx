import React, { FC } from "react";
import PrimaryGoal from "./PrimaryGoal";
import { HPrimaryGoal, cloneHPrimaryGoal, HashMap } from "../highlight";
import useCanEdit from "../hooks/useCanEdit";
import AddButton from "./AddButton";

interface PrimaryGoalPanelProps
{
    goals: PrimaryGoal[];
    highlight: HashMap<HPrimaryGoal>;
    setHighlight: (value: HashMap<HPrimaryGoal>) => void;
}

const PrimaryGoalPanel: FC<PrimaryGoalPanelProps> = ({ goals, highlight, setHighlight }) =>
{
    const canEdit = useCanEdit();

    const updateGoalHighlight = function (value: HPrimaryGoal)
    {
        highlight[value.id] = value;
        setHighlight(highlight);
    };

    return (
        <>
            <ol type="I">
                {goals.map(goal =>
                    <PrimaryGoal
                        key={goal.id}
                        goal={goal}
                        highlight={cloneHPrimaryGoal(highlight[goal.id])}
                        setHighlight={updateGoalHighlight}
                    />
                )}
            </ol>
            {canEdit ? <AddButton /> : null}
        </>
    );
};

export default PrimaryGoalPanel;
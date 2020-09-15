import React, { FC } from "react";
import PrimaryGoal from "./PrimaryGoal";
import { PrimaryGoal as HPrimaryGoal, HashMap } from "../highlight/modelds";
import { PrimaryGoal as MPrimaryGoal } from "../models";
import useCanEdit from "../hooks/useCanEdit";
import AddButton from "./AddButton";
import { DerivedAtom, derive } from "../hooks/useAtom";

interface PrimaryGoalPanelProps
{
    goals: MPrimaryGoal[];
    highlight: DerivedAtom<HashMap<HPrimaryGoal>>;
}

const PrimaryGoalPanel: FC<PrimaryGoalPanelProps> = ({ goals, highlight }) =>
{
    const canEdit = useCanEdit();

    return (
        <>
            <ol type="I">
                {goals.map(goal =>
                    <PrimaryGoal
                        key={goal.id}
                        goal={goal}
                        highlight={derive(highlight, goal.id)}
                    />
                )}
            </ol>
            {canEdit ? <AddButton /> : null}
        </>
    );
};

export default PrimaryGoalPanel;
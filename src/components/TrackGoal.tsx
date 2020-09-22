import React from "react";
import { Goal } from "../highlight/modelds";
import { TrackGoal as MTrackGoal, PrimaryReference } from "../models";
import GoalElement from "./GoalElement";
import { DerivedAtom, readAtom } from "../hooks/useAtom";
import { EditEnv } from "../models/environment";

interface TrackGoalProps
{
    goal: DerivedAtom<MTrackGoal>;
    highlight: DerivedAtom<Goal>;
    env: EditEnv;
}

const renderReferences = (refs: PrimaryReference[]) =>
{
    if (refs.length === 0)
    {
        return ("");
    }

    const text =
        refs.map(ref =>
            ref.subGoals.length === 0 ?
                ref.goal :
                ref.goal + " " + ref.subGoals.join(", ")
        ).join("; ");

    return ("(" + text + ")");
};

const TrackGoal = ({ goal, highlight, env }: TrackGoalProps) =>
{
    const [selected, setSelected] = readAtom(highlight);

    const toggleSelection = () => setSelected({ selected: !selected.selected });
    return (
        <GoalElement goal={goal} averageScores highlight={selected} env={env} onClick={toggleSelection}>
            {renderReferences(goal.get.references)}
        </GoalElement>
    )
};

export default TrackGoal;
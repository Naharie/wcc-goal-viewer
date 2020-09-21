import React, { FC } from "react";
import { Goal as HGoal } from "../highlight/modelds";
import { Goal } from "../models";
import { list } from "../utilities/css";
import ScoreList from "./ScoreList";
import { DerivedAtom, readAtom } from "../hooks/useAtom";

interface PrimarySubGoalProps
{
    goal: DerivedAtom<Goal>;
    highlight: DerivedAtom<HGoal>;
}

const PrimarySubGoal: FC<PrimarySubGoalProps> = ({ goal, highlight }) =>
{
    const [selected, setSelected] = readAtom(highlight);

    const toggleSelection = () =>
    {
        setSelected({ selected: !selected.selected });
    };

    return (
        <li
            className={list("pb-0-2", selected.selected ? "selected" : "non-selected")}
            onClick={toggleSelection}
        >
            {goal.get.text}
            <ScoreList scores={selected.scores} averageScores />
        </li>
    );
};

export default PrimarySubGoal;
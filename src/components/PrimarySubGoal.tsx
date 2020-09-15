import React, { FC } from "react";
import { Goal as HGoal } from "../highlight/modelds";
import { Goal } from "../models";
import { list } from "../utilities/css";
import ScoreList from "./ScoreList";
import { DerivedAtom, useAtom } from "../hooks/useAtom";

interface PrimarySubGoalProps
{
    goal: Goal;
    highlight: DerivedAtom<HGoal>;
}

const PrimarySubGoal: FC<PrimarySubGoalProps> = ({ goal, highlight }) =>
{
    const [selected, setSelected] = useAtom(highlight);

    const toggleSelection = () =>
    {
        setSelected({ selected: !selected.selected });
    };

    return (
        <li
            className={list("pb-0-2", selected ? "selected" : "non-selected")}
            onClick={toggleSelection}
        >
            {goal.text}
            <ScoreList scores={selected.scores} />
        </li>
    );
};

export default PrimarySubGoal;
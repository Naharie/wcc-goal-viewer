import React, { FC } from "react";
import { HGoal } from "../highlight";
import { list } from "../utilities";
import ScoreList from "./ScoreList";

interface PrimarySubGoalProps
{
    goal: Goal;
    highlight: HGoal;
    setHighlight: (value: HGoal) => void;
}

const PrimarySubGoal: FC<PrimarySubGoalProps> = ({ goal, highlight, setHighlight }) =>
{
    const toggleSelection = () =>
    {
        highlight.selected = !highlight.selected;
        setHighlight(highlight);
    };

    return (
        <li
            className={list("pb-0-2", highlight.selected ? "selected" : "non-selected")}
            onClick={toggleSelection}
        >
            {goal.text}
            <ScoreList scores={highlight.scores} />
        </li>
    );
};

export default PrimarySubGoal;
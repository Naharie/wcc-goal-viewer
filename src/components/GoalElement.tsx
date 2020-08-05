import React, { FC, useState, useRef } from "react";
import { HGoal } from "../highlight";
import { list } from "../utilities";
import Textbox from "./Textbox";
import ScoreList from "./ScoreList";
import { setServers } from "dns";
import useCanEdit from "../utilities/useCanEdit";

interface GoalElementProps
{
    goal: Goal;
    highlight: HGoal;

    isEditingScores?: boolean;
    setScores?: (value: number[]) => void;

    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const GoalElement: FC<GoalElementProps> = ({ goal, highlight, children, isEditingScores, setScores, onClick }) =>
{
    const [isEditing, setEditing] = useState(false);
    const text = useRef(goal.text);
    const canEdit = useCanEdit();

    const toggleEditing = () =>
    {
        if (canEdit)
        {
            setEditing(!isEditing);
        }
    };
    const setScoresWrapper = (value: number[]) =>
    {
        if (setScores !== undefined)
        {
            setScores(value);
        }
    };

    return (
        <li
            className={list("mb-1-3", highlight.selected ? "selected" : "")}
            onClick={event => !isEditing ? onClick(event) : undefined}
            onDoubleClick={toggleEditing}
        >
            <Textbox text={text} selected={highlight.selected} isEditing={isEditing} /> {children}
            <ScoreList scores={highlight.scores} isEditing={isEditingScores} setScores={setScoresWrapper} />
        </li>
    );
};

export default GoalElement;
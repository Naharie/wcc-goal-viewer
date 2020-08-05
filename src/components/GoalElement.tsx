import React, { FC, useState, useRef } from "react";
import { HGoal } from "../highlight";
import { list } from "../utilities";
import Textbox from "./Textbox";
import ScoreList from "./ScoreList";
import useCanEdit from "../utilities/useCanEdit";
import editCache from "../utilities/editCache";

interface GoalElementProps
{
    goal: Goal;
    highlight: HGoal;

    isEditingScores?: boolean;
    setScores?: (value: number[]) => void;

    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
    onToggleEdit?: (isEditing: boolean) => void;
}

const GoalElement: FC<GoalElementProps> = ({ goal, highlight, children, isEditingScores, setScores, onClick, ...props }) =>
{
    const [isEditing, setEditing] = useState(false);
    const text = useRef(goal.text);
    const canEdit = useCanEdit();

    const toggleEditing = () =>
    {
        if (canEdit)
        {
            if (props.onToggleEdit)
            {
                props.onToggleEdit(!isEditing);
            }

            // Inverted because this happens before the toggle.
            if (!isEditing)
            {
                if (editCache.goal !== goal)
                {
                    editCache.cancelCurrentEditor();
                    editCache.cancelCurrentEditor = () => setEditing(false);
                    editCache.goal = goal;
                }
            }
            else
            {
                editCache.cancelCurrentEditor = () => {};
                editCache.goal = { id: "", text: "" };
            }

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
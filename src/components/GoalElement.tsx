import React, { FC, useState, useRef } from "react";
import { Goal as HGoal } from "../highlight/modelds";
import { Goal } from "../models";
import { list } from "../utilities/css";
import Textbox from "./Textbox";
import ScoreList from "./ScoreList";
import useCanEdit from "../hooks/useCanEdit";
import { editor } from "../utilities/editor";

interface GoalElementProps
{
    goal: Goal;
    highlight: HGoal;

    averageScores?: boolean;
    isEditingScores?: boolean;
    setScores?: (value: number[]) => void;

    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
    onToggleEdit?: (isEditing: boolean) => void;
}

const GoalElement: FC<GoalElementProps> = ({ goal, highlight, children, onClick, ...props }) =>
{
    const [isEditing, setEditing] = useState(false);
    const text = useRef(goal.text);
    const canEdit = useCanEdit();

    const toggleEditing = () =>
    {
        if (canEdit)
        {
            props?.onToggleEdit?.(!isEditing);

            // If we are opening the editor
            if (!isEditing)
            {
                if (editor.goal !== goal)
                {
                    editor.cancel();
                    editor.cancel = () => setEditing(false);
                    editor.goal = goal;
                }
            }
            // If we are closing the editor
            else
            {
                editor.cancel = () => {};
                editor.goal = undefined;
            }

            setEditing(!isEditing);
        }
    };

    return (
        <li
            className={list("mb-1-3", highlight.selected ? "selected" : "")}
            onClick={event => !isEditing ? onClick?.(event) : undefined}
            onDoubleClick={toggleEditing}
        >
            <Textbox text={text} selected={highlight.selected} isEditing={isEditing} /> {children}
            <ScoreList
                scores={highlight.scores}
                averageScores={props.averageScores}
                isEditing={props.isEditingScores}
                setScores={props.setScores}
            />
        </li>
    );
};

export default GoalElement;
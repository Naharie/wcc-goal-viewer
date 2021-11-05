import React, { FC, useState, useRef } from "react";
import { Goal as HGoal } from "../highlight/modelds";
import { Goal } from "../models";
import { list } from "../utilities/css";
import Textbox from "./Textbox";
import ScoreList from "./ScoreList";
import useCanEdit from "../hooks/useCanEdit";
import { editor } from "../utilities/editor";
import { derive, DerivedAtom, readAtom } from "../hooks/useAtom";
import { EditEnv } from "../models/environment";

interface GoalElementProps
{
    goal: DerivedAtom<Goal>;
    highlight: HGoal;

    averageScores?: boolean;
    isEditingScores?: boolean;
    setScores?: (value: number[]) => void;

    env: EditEnv;

    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
    onToggleEdit?: (isEditing: boolean) => void;
}

// TODO: Add the fancy warning indicators.

const GoalElement: FC<GoalElementProps> = ({ goal, highlight, children, onClick, ...props }) =>
{
    const [isEditing, setEditing] = useState(false);
    const canEdit = useCanEdit();

    const toggleEditing = () =>
    {
        if (canEdit)
        {
            props?.onToggleEdit?.(!isEditing);

            // If we are opening the editor
            if (!isEditing)
            {
                if (editor.goal !== goal.get.id)
                {
                    editor.cancel();
                    editor.cancel = () =>
                    {
                        setEditing(false);
                        props.env.updateDiff();
                    }
                    editor.goal = goal.get.id;
                }
            }
            // If we are closing the editor
            else
            {
                editor.cancel = () => {};
                editor.goal = undefined;
                props.env.updateDiff();
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
            <Textbox text={derive(goal, "text")} selected={highlight.selected} isEditing={isEditing} /> {children}
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
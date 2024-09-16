import React, { PropsWithChildren, ReactNode, useRef } from "react";
import { Goal } from "../data/validation";
import useClick from "../hooks/useClick";
import chooseBackground from "../utilities/choose-background";
import GoalText from "./editor/GoalText";
import ValidatedTextBox from "./editor/ValidatedTextBox";
import ScoreBadge from "./scores/ScoreBadge";
import { closeEditor, openEditor, startDeletion, stopDeletion, useEditor } from "../data/editor";

interface GoalProps
{
    goal: Goal;
    score?: number;
    highlighted: boolean;

    references?: {
        value: string;
        validator: (references: string) => true | string;
        saveReferences: (references: string) => void;
    },

    saveGoal?: (text: string) => void;
    deleteGoal?: () => void;

    className?: string;

    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
    onDoubleClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const GoalBase = ({ goal, score, references, ...props }: PropsWithChildren<GoalProps>) =>
{
    const confirmDeletion = useEditor(editor => editor.confirmDeletion);
    const canEdit = useEditor(editor => editor.enabled);
    const dimmed = useEditor(editor => editor.id !== undefined && editor.id !== goal.id);
    const editable = useEditor(editor => editor.id === goal.id);

    const goalText = useRef(goal.text);
    const goalReferences = useRef(references?.value?.trim() ?? "");

    const lastClick = useRef(0);

    const [mouseDown, mouseUp] = useClick<HTMLLIElement>(event =>
    {
        if (editable || dimmed) return;
        props.onClick?.(event);

        if (!canEdit) return;

        const now = Date.now();

        if (now - lastClick.current < 250)
        {
            openEditor(goal.id);
        }

        lastClick.current = now;
    });

    let slotAfterText: ReactNode = null;
    let deleteModal: ReactNode = null;

    const updateGoalText = (value: string) => goalText.current = value;

    const deleteGoal = () =>
    {
        startDeletion({
            yes: () =>
            {
                props.deleteGoal?.();
                stopDeletion();
            },
            no: stopDeletion
        });
    }
    const saveChanges = () =>
    {
        closeEditor();
        props.saveGoal?.(goalText.current);
        references?.saveReferences(goalReferences.current);
    };

    if (references !== undefined && (references.value !== "" || editable))
    {
        const updateReferences = (value: string) => goalReferences.current = value;

        slotAfterText = editable ?
            <ValidatedTextBox value={goalReferences.current} validator={references.validator} textChanged={updateReferences} /> :
            goalReferences.current.length > 0 ? ` (${goalReferences.current}).` : ".";
    }

    return (
        <li
            className={
                "relative list-item rounded-md " +
                chooseBackground(props.highlighted, dimmed) +
                (editable && confirmDeletion === undefined ? " z-[200] " : " " ) +
                (props.className ?? "")
            }
            onMouseDown={mouseDown} onMouseUp={mouseUp}
        >
            <GoalText value={goalText.current} isEditable={editable} textChanged={updateGoalText} />
            
            {slotAfterText}
            {score !== undefined && score > -1 ? <ScoreBadge className="ml-3" value={score} /> : null}
            
            {props.children}
            
            {editable ?
                <>
                    {deleteModal}
                    <div className="flex w-full mt-2">
                        <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-l-md" onClick={saveChanges}>Done</button>
                        <button className="flex-1 bg-gray-400 hover:bg-red-500 rounded-1-md" onClick={deleteGoal}>Delete</button>
                        <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-r-md" onClick={closeEditor}>Cancel</button>
                    </div>
                </>
            : null}
        </li>
    )
};

export default GoalBase;
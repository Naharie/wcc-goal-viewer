import React, { PropsWithChildren, ReactNode } from "react";
import { useSnapshot } from "valtio";
import store from "../data";
import { Goal } from "../data/json";
import useClick from "../hooks/useClick";
import chooseBackground from "../utilities/choose-background";
import GoalText from "./editor/GoalText";
import TrashCan from "./icons/trash-can";
import ScoreBadge from "./scores/ScoreBadge";

interface GoalProps
{
    goal: Goal;
    score?: number;

    slotAfterText?: ReactNode;

    highlighted: boolean;

    className?: string;
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const GoalBase = ({ goal, score, slotAfterText, ...props }: PropsWithChildren<GoalProps>) =>
{
    const view = useSnapshot(store);
    const dimmed = view.editorId != undefined && view.editorId != goal.id;
    const editable = view.editorId === goal.id;

    const [mouseDown, mouseUp] = useClick<HTMLLIElement>(event =>
    {
        if (editable || dimmed) return;
        props.onClick?.(event);
    });

    return (
        <li
            className={"list-item rounded-md " + chooseBackground(props.highlighted, dimmed) + (props.className ?? "")}
            onMouseDown={mouseDown} onMouseUp={mouseUp}
        >
            {editable ?
                <TrashCan className="absolute right-1 box-content p-1 hover:bg-red-500 cursor-pointer rounded-md" /> : null
            }
            <GoalText value={goal.text} isEditable={editable} />
            {slotAfterText}
            {score && score > -1 ? <ScoreBadge className="ml-3" value={score} /> : null}
            {props.children}
        </li>
    )
};

export default GoalBase;
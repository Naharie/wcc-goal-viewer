import React, { PropsWithChildren, ReactNode } from "react";
import { useSnapshot } from "valtio";
import store from "../data";
import { Goal as GoalElement } from "../data/types";
import useClick from "../hooks/useClick";
import chooseBackground from "../utilities/choose-background";
import GoalText from "./editor/GoalText";
import ScoreBadge from "./scores/ScoreBadge";

interface GoalProps
{
    goal: GoalElement;
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
            <GoalText value={goal.text} isEditable={editable} />
            {slotAfterText}
            {score && score > -1 ? <ScoreBadge className="ml-3" value={score} /> : null}
            {props.children}
        </li>
    )
};

export default GoalBase;
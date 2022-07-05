import React, { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../data";
import { Goal as GoalElement } from "../data/types";
import useClick from "../hooks/useClick";
import chooseBackground from "../utilities/choose-background";
import ScoreBadge from "./scores/ScoreBadge";

interface GoalProps
{
    goal: GoalElement;
    score: number;

    highlighted: boolean;

    className?: string;
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const GoalBase = (props: PropsWithChildren<GoalProps>) =>
{
    const view = useSnapshot(store);
    const dimmed = view.editorId != undefined && view.editorId != props.goal.id;

    const [mouseDown, mouseUp] = useClick<HTMLLIElement>(event =>
    {
        if (dimmed) return;
        props.onClick?.(event);
    });

    return (
        <li
            className={"list-item rounded-md " + chooseBackground(props.highlighted, dimmed) + (props.className ?? "")}
            onMouseDown={mouseDown} onMouseUp={mouseUp}
        >
            {props.goal.text}
            {props.score > -1 ? <ScoreBadge className="ml-3" value={props.score} /> : null}

            {props.children}
        </li>
    )
};

export default GoalBase;
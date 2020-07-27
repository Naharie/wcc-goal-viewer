import React from "react";
import { HPrimaryGoal } from "../highlight";
import { list } from "../utilities";
import ScoreList from "./ScoreList";

interface PrimaryGoalProps
{
    goal: PrimaryGoal;
    highlight: HPrimaryGoal;
    setHighlight: (value: HPrimaryGoal) => void;
}

const PrimaryGoal = ({ goal, highlight, setHighlight }: PrimaryGoalProps) =>
{
    const toggleAll = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
    {
        // Avoid toggling everything anytime a sub goal is toggled.
        if (event.target !== event.currentTarget)
        {
            return;
        }

        highlight.selected = !highlight.selected;

        for (const key in highlight.children)
        {
            highlight.children[key].selected = highlight.selected;
        }

        setHighlight(highlight);
    };
    const toggleChild = (id: string) =>
    {
        const child = highlight.children[id];
        child.selected = !child.selected;

        if (child.selected)
        {
            highlight.selected = true;
            setHighlight(highlight);
        }
        else
        {
            highlight.selected = Object.values(highlight.children).some(child => child.selected);
            setHighlight(highlight);
        }
    };

    return (
        <li className={list("mb-1-3", highlight.selected ? "selected" : "")} onClick={toggleAll}>
            {goal.text}
            {
                <ol type="a">
                    {
                        goal.children.map(child =>
                            <li
                                key={child.id}
                                className={list("pb-0-2 non-selected", highlight.children[child.id].selected ? "selected" : "non-selected")}
                                onClick={() => toggleChild(child.id)}
                            >
                                {child.text}
                                <ScoreList scores={highlight.children[child.id].scores} />
                            </li>
                        )
                    }
                </ol>
            }

            <ScoreList scores={highlight.scores} />
        </li>
    );
};

export default PrimaryGoal;
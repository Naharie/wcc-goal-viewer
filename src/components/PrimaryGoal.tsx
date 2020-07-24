import React from "react";
import { HPrimaryGoal } from "../highlight";
import { list } from "../utilities";

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
        highlight.children.forEach(child => child.selected = highlight.selected);

        setHighlight(highlight);
    };
    const toggleChild = (id: string) =>
    {
        const child = highlight.children.find(child => child.id === id);
        
        if (!child)
        {
            return;
        }

        child.selected = !child.selected;

        if (child.selected)
        {
            highlight.selected = true;
            setHighlight(highlight);
        }
        else
        {
            highlight.selected = highlight.children.some(child => child.selected);
            setHighlight(highlight);
        }
    };

    return (
        <li className={list("mb-1-3", highlight.selected ? "selected" : "")} onClick={toggleAll}>
            {goal.text}
            {
                <ol type="a">
                    {
                        goal.children.map((child, index) =>
                            <li
                                key={child.id}
                                className={list("pb-0-2 non-selected", highlight.children[index].selected ? "selected" : "non-selected")}
                                onClick={() => toggleChild(child.id)}
                            >
                                {child.text}
                            </li>
                        )
                    }
                </ol>
            }
        </li>
    );
};

export default PrimaryGoal;
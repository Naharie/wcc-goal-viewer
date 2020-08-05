import React, { useState } from "react";
import { HPrimaryGoal, HGoal } from "../highlight";
import GoalElement from "./GoalElement";
import PrimarySubGoal from "./PrimarySubGoal";
import AddButton from "./AddButton";

interface PrimaryGoalProps
{
    goal: PrimaryGoal;
    highlight: HPrimaryGoal;
    setHighlight: (value: HPrimaryGoal) => void;
}

const PrimaryGoal = ({ goal, highlight, setHighlight }: PrimaryGoalProps) =>
{
    const [isEditing, setEditing] = useState(false);

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
    const setChildHighlight = (goal: HGoal) =>
    {
        highlight.children[goal.id] = goal;

        if (goal.selected)
        {
            highlight.selected = true;
        }
        else
        {
            highlight.selected = Object.values(highlight.children).some(child => child.selected);
        }

        setHighlight(highlight);
    };

    return (
        <GoalElement goal={goal} highlight={highlight} onClick={toggleAll} onToggleEdit={setEditing}>
            {
                <ol type="a">
                    {
                        goal.children.map(child =>
                            <PrimarySubGoal
                                key={child.id}
                                goal={child}
                                highlight={highlight.children[child.id]}
                                setHighlight={setChildHighlight}
                            />
                        )
                    }
                </ol>
            }
            {isEditing ? <AddButton /> : null}
        </GoalElement>
    );
};

export default PrimaryGoal;
import React, { useState } from "react";
import { PrimaryGoal as HPrimaryGoal, Goal } from "../highlight/modelds";
import { PrimaryGoal } from "../models";
import GoalElement from "./GoalElement";
import PrimarySubGoal from "./PrimarySubGoal";
import AddButton from "./AddButton";
import { DerivedAtom, useAtom, derive } from "../hooks/useAtom";
import * as _ from "lodash";

interface PrimaryGoalProps
{
    goal: PrimaryGoal;
    highlight: DerivedAtom<HPrimaryGoal>;
}

const PrimaryGoal = ({ goal, highlight }: PrimaryGoalProps) =>
{
    const [isEditing, setEditing] = useState(false);
    const [selected, setSelected] = useAtom(highlight);

    const toggleAll = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
    {
        // Avoid toggling everything anytime a sub goal is toggled.
        if (event.target !== event.currentTarget)
        {
            return;
        }

        setSelected ({
            selected: !selected.selected,
            children: _.mapValues(selected.children, () => ({ selected: selected.selected }))
        });
    };
    const updateHighlight = function (goal: Goal)
    {
        setSelected ({
            selected:
                goal.selected ?
                    true :
                    _.some(selected.children, child => child.selected)
        });
    };

    const children = derive(highlight, "children");

    return (
        <GoalElement goal={goal} highlight={selected} onClick={toggleAll} onToggleEdit={setEditing}>
            {
                <ol type="a">
                    {
                        goal.children.map(child =>
                            <PrimarySubGoal
                                key={child.id}
                                goal={child}
                                highlight={derive(children, child.id, updateHighlight)}
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
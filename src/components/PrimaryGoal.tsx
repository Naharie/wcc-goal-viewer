import React, { useState } from "react";
import { PrimaryGoal as HPrimaryGoal, Goal } from "../highlight/modelds";
import { PrimaryGoal as MPrimaryGoal } from "../models";
import GoalElement from "./GoalElement";
import PrimarySubGoal from "./PrimarySubGoal";
import AddButton from "./AddButton";
import { DerivedAtom, readAtom, derive } from "../hooks/useAtom";
import * as _ from "lodash";

interface PrimaryGoalProps
{
    goal: DerivedAtom<MPrimaryGoal>;
    highlight: DerivedAtom<HPrimaryGoal>;
}

const PrimaryGoal = ({ goal, highlight }: PrimaryGoalProps) =>
{
    const [isEditing, setEditing] = useState(false);
    const [selected, setSelected] = readAtom(highlight);

    const toggleAll = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
    {
        // Avoid toggling everything anytime a sub goal is toggled.
        if (event.target !== event.currentTarget)
        {
            return;
        }

        setSelected ({
            selected: !selected.selected,
            children: _.mapValues(selected.children, () => ({ selected: !selected.selected }))
        });
    };
    const updateHighlight = function (goal: Goal, total: Record<string, Goal>)
    {
        setSelected ({
            selected:
                goal.selected ?
                    true :
                    _.some(selected.children, child => child.selected)
        });

        return total;
    };

    const hChildren = derive(highlight, "children");
    const children = derive(goal, "children");

    return (
        <GoalElement goal={goal} averageScores highlight={selected} onClick={toggleAll} onToggleEdit={setEditing}>
            {
                <ol type="a">
                    {
                        goal.get.children.map((child, index) =>
                            <PrimarySubGoal
                                key={child.id}
                                goal={derive(children, index)}
                                highlight={derive(hChildren, child.id, updateHighlight)}
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
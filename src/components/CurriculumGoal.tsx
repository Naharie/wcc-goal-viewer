import React, { PropsWithChildren } from "react";
import { selectCurriculumGoal } from "../data";
import { useAppSelector } from "../hooks/redux";
import CurriculumSubGoal from "./CurriculumSubGoal";
import GoalElement from "./GoalElement";

const CurriculumGoal = ({ index }: PropsWithChildren<{ index: number }>) =>
{
    const goal = useAppSelector(selectCurriculumGoal(index));

    return (
        <GoalElement selector={selectCurriculumGoal(index)}>
            <ol type="a">
                {
                    goal.children.map((goal, subIndex) =>
                        <CurriculumSubGoal key={goal.id} index={index} subIndex={subIndex} />
                    )
                }
            </ol>
        </GoalElement>
    );
};

export default CurriculumGoal;
import { PropsWithChildren } from "react";
import { selectCurriculumGoal } from "../data";
import { useAppSelector } from "../hooks/redux";
import CurriculumSubGoal from "./CurriculumSubGoal";

const CurriculumGoal = ({ index }: PropsWithChildren<{ index: number }>) =>
{
    const goal = useAppSelector(selectCurriculumGoal(index));

    return (
        <li className="mb-6 list-item">
            {goal.text}
            <ol className="list-[lower-alpha] mt-1">
                {
                    goal.children.map((goal, subIndex) =>
                        <CurriculumSubGoal key={goal.id} index={index} subIndex={subIndex} />
                    )
                }
            </ol>
        </li>
    );
};

export default CurriculumGoal;
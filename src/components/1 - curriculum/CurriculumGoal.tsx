import { PropsWithChildren } from "react";
import useStore from "../../data";
import CurriculumSubGoal from "./CurriculumSubGoal";

const CurriculumGoal = ({ index }: PropsWithChildren<{ index: number }>) =>
{
    const goal = useStore(state => state.data.curriculumGoals[index]);

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
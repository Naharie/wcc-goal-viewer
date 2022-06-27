import { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import CurriculumSubGoal from "./CurriculumSubGoal";

const CurriculumGoal = ({ goal: index }: PropsWithChildren<{ goal: number }>) =>
{
    const view = useSnapshot(store);
    const goal = view.data.curriculumGoals[index];

    return (
        <li className="mb-6 list-item">
            {goal.text}
            <ol className="list-[lower-alpha] mt-1">
                {
                    goal.children.map((goal, childIndex) =>
                        <CurriculumSubGoal key={goal.id} curriculumGoal={index} subGoal={childIndex} />
                    )
                }
            </ol>
        </li>
    );
};

export default CurriculumGoal;
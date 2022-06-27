import { PropsWithChildren } from "react";
import store from "../../data";
import { useSnapshot } from "valtio";

interface CurriculumSubGoalProps
{
    curriculumGoal: number;
    subGoal: number;
}

const CurriculumSubGoal = ({ curriculumGoal, subGoal: subIndex }: PropsWithChildren<CurriculumSubGoalProps>) =>
{
    const view = useSnapshot(store);
    const goal = view.data.curriculumGoals[curriculumGoal].children[subIndex];

    return (<li className="list-item rounded-md mt-2">{goal.text}</li>);
};

export default CurriculumSubGoal;
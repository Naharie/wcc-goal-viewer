import { PropsWithChildren } from "react";
import useStore from "../../data";

const CurriculumSubGoal = ({ index, subIndex }: PropsWithChildren<{ index: number, subIndex: number }>) =>
{
    const goal = useStore(state => state.data.curriculumGoals[index].children[subIndex]);
    return (<li className="list-item">{goal.text}</li>);
};

export default CurriculumSubGoal;
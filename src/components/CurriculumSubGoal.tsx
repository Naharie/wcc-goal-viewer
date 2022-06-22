import { PropsWithChildren } from "react";
import { selectCurriculumSubGoal } from "../data";
import { useAppSelector } from "../hooks/redux";

const CurriculumSubGoal = ({ index, subIndex }: PropsWithChildren<{ index: number, subIndex: number }>) =>
{
    const goal = useAppSelector(selectCurriculumSubGoal(index, subIndex));
    return (<li className="list-item">{goal.text}</li>);
};

export default CurriculumSubGoal;
import { PropsWithChildren } from "react";
import { selectCurriculumSubGoal } from "../data";
import { useAppSelector } from "../hooks/redux";
import SubGoalElement from "./styled/SubGoalElement";

const CurriculumSubGoal = ({ index, subIndex }: PropsWithChildren<{ index: number, subIndex: number }>) =>
{
    const goal = useAppSelector(selectCurriculumSubGoal(index, subIndex));
    return (<SubGoalElement>{goal.text}</SubGoalElement>);
};

export default CurriculumSubGoal;
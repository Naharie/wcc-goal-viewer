import { PropsWithChildren } from "react";
import { Selector } from "../../data";
import useSelector from "../../hooks/useSelector";
import { CurriculumSubGoal as CurriculumSubGoalData } from "../../data/types";

interface CurriculumSubGoalProps
{
    selector: Selector<CurriculumSubGoalData>;
}

const CurriculumSubGoal = ({ selector }: PropsWithChildren<CurriculumSubGoalProps>) =>
{
    const [goal] = useSelector(selector);
    return (<li className="list-item">{goal.text}</li>);
};

export default CurriculumSubGoal;
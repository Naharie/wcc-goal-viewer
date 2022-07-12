import { PropsWithChildren } from "react";
import useCurriculumSubGoal from "../../data/views/1 - curriculum/useCurriculumSubGoal";
import GoalBase from "../GoalBase";

interface CurriculumSubGoalProps
{
    parentIndex: number;
    index: number;
}

const CurriculumSubGoal = ({ parentIndex, index }: PropsWithChildren<CurriculumSubGoalProps>) =>
{
    const { goal, highlighted, score, toggleHighlight } = useCurriculumSubGoal(parentIndex, index);

    return (
        <GoalBase
            goal={goal}
            highlighted={highlighted}
            score={score}
            
            className="mt-2"
            onClick={toggleHighlight}
        />
    );
};

export default CurriculumSubGoal;
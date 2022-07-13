import { PropsWithChildren } from "react";
import useData from "../../data";
import toggleCurriculumSubGoalHighlight from "../../data/actions/highlight/toggle/curriculumSubGoalHighlight";
import useHighlight from "../../data/highlight";
import useScores, { average } from "../../data/scores";
import GoalBase from "../GoalBase";

interface CurriculumSubGoalProps
{
    parentIndex: number;
    index: number;
}

const CurriculumSubGoal = ({ parentIndex, index }: PropsWithChildren<CurriculumSubGoalProps>) =>
{
    const parent = useData(data => data.curriculumGoals[parentIndex]);
    const goal = parent.children[index];
    const score = useScores(scores =>  average(scores.curriculumGoals[parent.ref].children[goal.ref]));
    const highlighted = useHighlight(highlight => highlight.curriculumGoals[parent.ref][goal.ref]);

    return (
        <GoalBase
            goal={goal}
            highlighted={highlighted}
            score={score}
            
            className="mt-2"
            onClick={toggleCurriculumSubGoalHighlight(parent.ref, goal.ref)}
        />
    );
};

export default CurriculumSubGoal;
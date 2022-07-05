import { PropsWithChildren } from "react";
import store from "../../data";
import { useSnapshot } from "valtio";
import { computeCurriculumToTrackHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import GoalBase from "../GoalBase";

interface CurriculumSubGoalProps
{
    curriculumGoal: number;
    subGoal: number;
}

const CurriculumSubGoal = ({ curriculumGoal, subGoal: subIndex }: PropsWithChildren<CurriculumSubGoalProps>) =>
{
    const view = useSnapshot(store);

    const parentGoal = view.data.curriculumGoals[curriculumGoal];
    const goal = view.data.curriculumGoals[curriculumGoal].children[subIndex];

    const highlighted = view.highlight.curriculumGoals[parentGoal.ref][goal.ref];
    const score = average(view.scores.curriculumGoals[parentGoal.ref].children[goal.ref]);

    const toggleHighlight = () =>
    {    
        const parentHighlight = store.highlight.curriculumGoals[parentGoal.ref];

        parentHighlight[goal.ref] = !parentHighlight[goal.ref];
        parentHighlight.self = parentHighlight[goal.ref];

        store.lastHighlightedColumn = "curriculum";
        computeCurriculumToTrackHighlighting();
    };

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
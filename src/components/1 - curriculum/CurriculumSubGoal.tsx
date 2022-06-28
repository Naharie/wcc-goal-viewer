import { PropsWithChildren } from "react";
import store from "../../data";
import { useSnapshot } from "valtio";
import { computeCurriculumToTrackHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import ScoreBadge from "../scores/Badge";

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

    const parentGoalHighlight = store.highlight.curriculumGoals[parentGoal.ref];
    const highlighted = view.highlight.curriculumGoals[parentGoal.ref][goal.ref];

    const score = average(view.scores.curriculumGoals[parentGoal.ref].children[goal.ref]);

    const toggleHighlight = () =>
    {    
        parentGoalHighlight[goal.ref] = !parentGoalHighlight[goal.ref];
        computeCurriculumToTrackHighlighting();
    };

    return (
        <li className={"list-item rounded-md mt-2" + (highlighted ? " bg-selected" : "")} onClick={toggleHighlight}>
            {goal.text}
            {score > -1 ? <ScoreBadge value={score} /> : null}
        </li>
    );
};

export default CurriculumSubGoal;
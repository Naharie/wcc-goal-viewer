import { PropsWithChildren } from "react";
import store from "../../data";
import { useSnapshot } from "valtio";
import { computeCurriculumToTrackHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import ScoreBadge from "../scores/ScoreBadge";
import chooseBackground from "../../utilities/choose-background";

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
    const dimmed = view.editorId !== undefined && view.editorId != goal.id;

    const score = average(view.scores.curriculumGoals[parentGoal.ref].children[goal.ref]);

    const toggleHighlight = () =>
    {    
        if (dimmed) return;

        const parentHighlight = store.highlight.curriculumGoals[parentGoal.ref];

        parentHighlight[goal.ref] = !parentHighlight[goal.ref];
        parentHighlight.self = parentHighlight[goal.ref];

        store.lastHighlightedColumn = "curriculum";
        computeCurriculumToTrackHighlighting();
    };

    return (
        <li className={"list-item rounded-md mt-2" + chooseBackground(highlighted, dimmed)} onClick={toggleHighlight}>
            {goal.text}
            {score > -1 ? <ScoreBadge className="ml-3" value={score} /> : null}
        </li>
    );
};

export default CurriculumSubGoal;
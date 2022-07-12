import { useSnapshot } from "valtio";
import store from "../..";
import swapGoals from "../../../utilities/swap-goals";
import { computeCurriculumToTrackHighlighting, swapCurriculumSubGoalReferences } from "../../highlight";
import { average } from "../../scores";

const useCurriculumGoal = (index: number) =>
{
    const view = useSnapshot(store);
    const goal = view.data.curriculumGoals[index];

    return ({
        goal,
        score: average(view.scores.curriculumGoals[goal.ref].score),

        dimmed: view.editorId != undefined && view.editorId != goal.id,
        allowSorting: view.editorEnabled && view.editorId === undefined,

        highlighted: Object.values(view.highlight.curriculumGoals[goal.ref]).some(v => v),
        
        toggleHighlight()
        {
            const highlighted = this.highlighted;
            const highlight = store.highlight.curriculumGoals[goal.ref];

            for (const key in highlight)
            {
                highlight[key] = !highlighted;
            }

            store.lastHighlightedColumn = "curriculum";
            computeCurriculumToTrackHighlighting();
        },
        swapChildren(a: string, b: string)
        {
            const curriculumGoal = store.data.curriculumGoals[index];
            const [success, refA, refB] = swapGoals(curriculumGoal.children, a, b);
    
            if (!success) return;
            swapCurriculumSubGoalReferences(curriculumGoal.ref, refA, refB);
        }
    });
};

export default useCurriculumGoal;
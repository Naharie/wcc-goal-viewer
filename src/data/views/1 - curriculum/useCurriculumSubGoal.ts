import { useSnapshot } from "valtio";
import store from "../..";
import { computeCurriculumToTrackHighlighting } from "../../highlight";
import { average } from "../../scores";

const useCurriculumSubGoal = (parentIndex: number, index: number) =>
{
    const view = useSnapshot(store);

    const parent = view.data.curriculumGoals[parentIndex];
    const goal = parent.children[index];

    return ({
        goal,
        score: average(view.scores.curriculumGoals[parent.ref].children[goal.ref]),

        dimmed: view.editorId != undefined && view.editorId != goal.id,
        highlighted: view.highlight.curriculumGoals[parent.ref][goal.ref],
        
        toggleHighlight()
        {
            store.highlight.curriculumGoals[parent.ref][goal.ref] = !this.highlighted;

            store.lastHighlightedColumn = "curriculum";
            computeCurriculumToTrackHighlighting();
        }
    });
};

export default useCurriculumSubGoal;
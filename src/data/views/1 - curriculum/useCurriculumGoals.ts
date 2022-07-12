import { useSnapshot } from "valtio";
import store from "../..";
import swapGoals from "../../../utilities/swap-goals";
import { swapCurriculumGoalReferences } from "../../highlight";

const useCurriculumGoals = () =>
{
    const view = useSnapshot(store);
    
    return ({
        goals: view.data.curriculumGoals,

        dimmed: view.editorId !== undefined,
        allowSorting: view.editorEnabled && view.editorId === undefined,

        swapChildren(a: string, b: string)
        {
            const curriculumGoals = store.data.curriculumGoals;
            const [success, refA, refB] = swapGoals(curriculumGoals, a, b);

            if (success)
            {
                swapCurriculumGoalReferences(refA, refB);

                if (store.lastHighlightedColumn === "curriculum")
                {
                    const [highlightA, highlightB] = [ store.highlight.curriculumGoals[refA], store.highlight.curriculumGoals[refB] ];
                    [ store.highlight.curriculumGoals[refA], store.highlight.curriculumGoals[refB] ] = [highlightB, highlightA];
                }
            }
        }
    })
};

export default useCurriculumGoals;
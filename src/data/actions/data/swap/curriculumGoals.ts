import useData from "../../..";
import swapGoals from "../../../../utilities/swap-goals";
import useHighlight from "../../../highlight";
import swapCurriculumGoalReferences from "../references/swapCurriculumGoals";

const swapCurriculumGoals = (idA: string, idB: string) =>
{
    const updateData = useData.getState().update;
    const updateHighlight = useHighlight.getState().update;
    
    const lastHighlightedColumn = useHighlight.getState().lastHighlightedColumn;

    updateData(data =>
    {
        const curriculumGoals = data.curriculumGoals;
        const [success, refA, refB] = swapGoals(curriculumGoals, idA, idB);

        if (!success) return;
        swapCurriculumGoalReferences(data, refA, refB);

        if (lastHighlightedColumn === "curriculum")
        {
            updateHighlight(highlight =>
            {
                const [highlightA, highlightB] = [ highlight.curriculumGoals[refA], highlight.curriculumGoals[refB] ];
                [ highlight.curriculumGoals[refA], highlight.curriculumGoals[refB] ] = [highlightB, highlightA];
            });
        }
    });
};

export default swapCurriculumGoals;
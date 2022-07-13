import useHighlight from "../../../highlight";
import computeCurriculumToTrackHighlighting from "../compute/curriculumToTrackHighlighting";

const toggleCurriculumSubGoalHighlight = (ref: string, subRef: string) => () =>
{
    const update = useHighlight.getState().update;

    update(highlight =>
    {
        highlight.curriculumGoals[ref][subRef] = !highlight.curriculumGoals[ref][subRef];
        highlight.lastHighlightedColumn = "curriculum";
    });

    computeCurriculumToTrackHighlighting();
};

export default toggleCurriculumSubGoalHighlight;
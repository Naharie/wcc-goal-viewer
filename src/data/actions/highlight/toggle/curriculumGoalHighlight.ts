import useHighlight from "../../../highlight";
import computeCurriculumToTrackHighlighting from "../compute/curriculumToTrackHighlighting";

const toggleCurriculumGoalHighlight = (ref: string) => () =>
{
    const highlighted = Object.values(useHighlight.getState().curriculumGoals[ref]).some(v => v);

    const update = useHighlight.getState().update;

    update(highlight =>
    {
        const goalHighlight = highlight.curriculumGoals[ref];

        for (const key in goalHighlight)
        {
            goalHighlight[key] = !highlighted;
        }
    
        highlight.lastHighlightedColumn = "curriculum";
    });

    computeCurriculumToTrackHighlighting();
};

export default toggleCurriculumGoalHighlight;
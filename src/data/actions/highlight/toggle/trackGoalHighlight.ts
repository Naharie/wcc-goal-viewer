import useHighlight from "../../../highlight";
import clearCurriculumHighlight from "../clearCurriculumHighlight";
import computeTrackToCourseHighlighting from "../compute/trackToCourseHighlighting";

const toggleTrackGoalHighlight = (trackName: string, goalRef: string) => () =>
{
    const update = useHighlight.getState().update;
    const highlighted = useHighlight.getState().tracks[trackName][goalRef];

    update (highlight =>
    {
        highlight.tracks[trackName][goalRef] = !highlighted;
        highlight.lastHighlightedColumn = "tracks";
    });

    clearCurriculumHighlight();
    computeTrackToCourseHighlighting();
};

export default toggleTrackGoalHighlight;
import useData from "../../..";
import useHighlight from "../../../highlight";
import computeTrackToCourseHighlighting from "./trackToCourseHighlighting";

const computeCurriculumToTrackHighlighting = () =>
{
    const tracks = useData.getState().tracks;
    const update = useHighlight.getState().update;

    update (highlight =>
    {
        const curriculumHighlight = highlight.curriculumGoals;

        for (const { name: track, goals } of tracks)
        {
            for (const goal of goals)
            {
                highlight.tracks[track][goal.ref] = goal.references.some(
                    ref =>
                        ref.subGoals?.length ?? 0 > 0 ?
                            ref.subGoals?.some(subGoalRef => curriculumHighlight[ref.goal][subGoalRef]) ?? false :
                            Object.values(curriculumHighlight[ref.goal]).some(v => v)
                );
            }
        }
    });

    computeTrackToCourseHighlighting();
};

export default computeCurriculumToTrackHighlighting;
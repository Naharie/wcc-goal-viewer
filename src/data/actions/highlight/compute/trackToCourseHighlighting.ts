import useData from "../../..";
import useHighlight from "../../../highlight";

const computeTrackToCourseHighlighting = () =>
{
    const courses = useData.getState().courses;
    const update = useHighlight.getState().update;

    update (highlight =>
    {
        const trackHighlight = highlight.tracks;

        for (const { name: course, years } of courses)
        {
            for (const { semesters } of years)
            {
                for (const semester of semesters)
                {
                    for (const goal of semester)
                    {
                        highlight.courses[course][goal.ref] = goal.references.some(
                            reference => trackHighlight[course][reference]
                        );
                    }
                }
            }
        }
    });
};

export default computeTrackToCourseHighlighting;
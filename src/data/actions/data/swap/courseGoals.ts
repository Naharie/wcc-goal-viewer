import useData from "../../..";
import swapGoals from "../../../../utilities/swap-goals";
import computeTrackToCourseHighlighting from "../../highlight/compute/trackToCourseHighlighting";

const swapCourseGoals = (course: number, year: number, semesterIndex: number) => (idA: string, idB: string) =>
{
    const update = useData.getState().update;

    update (data =>
    {
        const semester = data.courses[course].years[year].semesters[semesterIndex];
        swapGoals(semester, idA, idB);
    });

    computeTrackToCourseHighlighting();
};

export default swapCourseGoals;
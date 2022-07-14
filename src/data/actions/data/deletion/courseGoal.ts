import useData from "../../..";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const deleteCourseGoal = (courseIndex: number, year: number, semesterIndex: number, goalIndex: number) =>
{
    useData.getState().update(data =>
    {
        const course = data.courses[courseIndex];
        const semester = course.years[year].semesters[semesterIndex];
        const goal = semester[goalIndex];

        semester.splice(goalIndex, 1);

        useScores.getState().update(scores =>
        {
            delete scores.courses[course.name][goal.ref];
        })
        useHighlight.getState().update(highlight =>
        {
            delete highlight.courses[course.name][goal.ref];
        });
    });
};

export default deleteCourseGoal;
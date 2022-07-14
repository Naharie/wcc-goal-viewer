import useData from "../../..";
import { nextUppercaseLetter } from "../../../../utilities/alphabet";
import nextGoalId from "../../../../utilities/goal-id";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const addCourseGoal = (courseIndex: number, year: number, semesterIndex: number) =>
{
    useData.getState().update(data =>
    {
        const course = data.courses[courseIndex];
        const semester = course.years[year].semesters[semesterIndex];
        const id = nextGoalId();
        const ref = semester.length === 0 ? "A" : nextUppercaseLetter(semester[semester.length - 1].ref);

        semester.push({
            text: "== PLACEHOLDER ==",
            id, ref,
            references: []
        });

        useScores.getState().update(scores =>
        {
            scores.courses[course.name][ref] = [];
        });
        useHighlight.getState().update(highlight =>
        {
            highlight.courses[course.name][ref] = false;
        });
    });
};

export default addCourseGoal;
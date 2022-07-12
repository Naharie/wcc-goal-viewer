import { useSnapshot } from "valtio";
import store from "../..";

const useCourseGoal = (courseIndex: number, year: number, semester: number, goalIndex: number) =>
{
    const view = useSnapshot(store);

    const course = view.data.courses[courseIndex];
    const goal = course.years[year].semesters[semester][goalIndex];

    return ({
        goal: course.years[year].semesters[semester][goalIndex],
        
        scores: view.scores.courses[course.name][goal.ref],
        editableScores: store.scores.courses[course.name][goal.ref],

        dimmed: view.editorId !== undefined && view.editorId != goal.id,
        editable: view.editorId === goal.id,
        
        highlighted: view.highlight.courses[course.name][goal.ref],
    });
};

export default useCourseGoal;
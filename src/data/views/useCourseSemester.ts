import { useSnapshot } from "valtio";
import store from "..";
import swapGoals from "../../utilities/swap-goals";
import { computeTrackToCourseHighlighting } from "../highlight";

const useCourseSemester = (course: number, year: number, semesterIndex: number) =>
{
    const view = useSnapshot(store);

    return ({
        semester: view.data.courses[course].years[year].semesters[semesterIndex],
        allowSorting: view.editorEnabled && view.editorId === undefined,

        swapChildren(a: string, b: string)
        {
            const semester = store.data.courses[course].years[year].semesters[semesterIndex];
            swapGoals(semester, a, b);
            computeTrackToCourseHighlighting();
        }
    });
};

export default useCourseSemester;
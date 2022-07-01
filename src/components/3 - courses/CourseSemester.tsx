import { PropsWithChildren, useCallback } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import swapGoals from "../../utilities/swap-goals";
import SortableList from "../sortable/SortableList";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    course: number;
    year: number;
    semester: number;
}

const CourseSemester = ({ course, year, semester: semesterIndex }: PropsWithChildren<CourseSemesterProps>) =>
{
    const view = useSnapshot(store);
    const semester = view.data.courses[course].years[year].semesters[semesterIndex];

    const goals = 
        semester.map((goal, index) => ({
            id: goal.id.toString(),
            value: <CourseGoal key={goal.id} course={course} year={year} semester={semesterIndex} goal={index} />
        }));

    const handleSwap = (a: string, b: string) =>
    {
        const semester = store.data.courses[course].years[year].semesters[semesterIndex];
        swapGoals(semester, a, b);
    };

    if (semester.length === 0)
    {
        return (<div className="flex-1 mb-4 mx-4"></div>);
    }

    return (
        <div className="flex-1 mb-4 mx-4">
            <a className="block text-center no-underline text-black mb-4">
                {(year + 1) * 100 + semesterIndex + 1}
            </a>
            <SortableList
                className="list-[upper-alpha]"
                dragId={"curriculum-" + course + "-" + year + "-" + semesterIndex}
                items={goals}
                onSwap={handleSwap}
            />
        </div>
    );
};

export default CourseSemester;
import { PropsWithChildren, useCallback } from "react";
import useCourseSemester from "../../data/views/useCourseSemester";
import SortableList from "../sortable/SortableList";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    course: number;
    year: number;
    semesterIndex: number;
}

const CourseSemester = ({ course, year, semesterIndex }: PropsWithChildren<CourseSemesterProps>) =>
{
    const { semester, allowSorting, swapChildren } = useCourseSemester(course, year, semesterIndex);

    const goals = 
        semester.map((goal, index) =>
        ({
            id: goal.id.toString(),
            value: <CourseGoal key={goal.id} course={course} year={year} semester={semesterIndex} goal={index} />
        }));

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
                lockXAxis
                allowSorting={allowSorting}
                onSwap={swapChildren}
            />
        </div>
    );
};

export default CourseSemester;
import { PropsWithChildren } from "react";
import useData from "../../data";
import swapCourseGoals from "../../data/actions/data/swap/courseGoals";
import useEditor from "../../data/editor";
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
    const semester = useData(data => data.courses[course].years[year].semesters[semesterIndex]);
    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);

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
                onSwap={swapCourseGoals(course, year, semesterIndex)}
            />
        </div>
    );
};

export default CourseSemester;
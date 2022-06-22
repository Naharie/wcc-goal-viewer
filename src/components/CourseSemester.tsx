import { selectCourseSemester, selectCourseYear } from "../data";
import { useAppSelector } from "../hooks/redux";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    course: number;
    year: number;
    semester: number;
}

const CourseSemester = ({ course, year: yearIndex, semester: semesterIndex }: CourseSemesterProps) =>
{
    const year = useAppSelector(selectCourseYear(course, yearIndex));
    const semester = useAppSelector(selectCourseSemester(course, yearIndex, semesterIndex));

    if (semester.length === 0)
    {
        return (<div className="flex-1 mb-4 mx-8"></div>);
    }

    return (
        <div className="flex-1 mb-4 mx-8">
            <a className="block text-center no-underline text-black mb-4">
                {year.number + semesterIndex + 1}
            </a>
            <ol className="list-[upper-alpha]">
                {semester.map((goal, index) =>
                    <CourseGoal key={goal.id} course={course} year={yearIndex} semester={semesterIndex} goal={index} />
                )}
            </ol>
        </div>
    );
};

export default CourseSemester;
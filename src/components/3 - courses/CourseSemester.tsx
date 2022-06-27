import { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
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

    if (semester.length === 0)
    {
        return (<div className="flex-1 mb-4 mx-8"></div>);
    }

    return (
        <div className="flex-1 mb-4 mx-8">
            <a className="block text-center no-underline text-black mb-4">
                {(year + 1) * 100 + semesterIndex + 1}
            </a>
            <ol className="list-[upper-alpha]">
                {semester.map((goal, index) =>
                    <CourseGoal key={goal.id} course={course} year={year} semester={semesterIndex} goal={index} />
                )}
            </ol>
        </div>
    );
};

export default CourseSemester;
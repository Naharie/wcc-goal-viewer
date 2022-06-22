import useStore from "../data";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    course: number;
    year: number;
    semester: number;
}

const CourseSemester = ({ course, year: yearIndex, semester: semesterIndex }: CourseSemesterProps) =>
{
    const year = useStore(state => state.data.courses[course].years[yearIndex]);
    const semester = year.semesters[semesterIndex];

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
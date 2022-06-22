import CourseSemester from "./CourseSemester";

const CourseYear = ({ course, year }: { course: number, year: number }) =>
{
    return (
        <div className="flex justify-center w-full">
            <CourseSemester course={course} year={year} semester={0} />
            <CourseSemester course={course} year={year} semester={1} />
        </div>
    );
};

export default CourseYear;
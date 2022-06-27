import { PropsWithChildren } from "react";
import CourseSemester from "./CourseSemester";

interface CourseYearProps
{
    course: number;
    year: number;
}

const CourseYear = ({ course, year: yearIndex }: PropsWithChildren<CourseYearProps>) =>
{
    return (
        <div className="flex justify-center w-full">
            <CourseSemester course={course} year={yearIndex} semester={0} />
            <CourseSemester course={course} year={yearIndex} semester={1} />
        </div>
    );
};

export default CourseYear;
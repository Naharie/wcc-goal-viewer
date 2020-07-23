import React from "react";
import CourseSemester from "./CourseSemester";

interface CourseYearProps
{
    year: Year;
}

const CourseYear = ({ year }: CourseYearProps) =>
    <div className="flex justify-content-center w-100">
        <CourseSemester year={year.yearNumber + 1} semester={year.semester1} />
        <CourseSemester year={year.yearNumber + 2} semester={year.semester2} />
    </div>;

export default CourseYear;
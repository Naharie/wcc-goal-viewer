import React from "react";
import CourseSemester from "./CourseSemester";
import { HYear } from "../highlight";

interface CourseYearProps
{
    year: Year;
    highlight: HYear;
}

const CourseYear = ({ year, highlight }: CourseYearProps) =>
    <div className="flex justify-content-center w-100">
        <CourseSemester year={year.yearNumber + 1} semester={year.semester1} highlight={highlight.semester1} />
        <CourseSemester year={year.yearNumber + 2} semester={year.semester2} highlight={highlight.semester2} />
    </div>;

export default CourseYear;
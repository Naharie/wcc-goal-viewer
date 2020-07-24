import React, { FC } from "react";
import { list } from "../utilities";
import CourseYear from "./CourseYear";
import { HCourse } from "../highlight";

interface CourseProps
{
    course: Course;
    highlight: HCourse;
    className?: string;
}

const Course: FC<CourseProps> = ({ course, highlight, className }) =>
    <div
        key={course.course}
        id={"course_" + course.course}
        className={list("flex flex-column align-items-center mb-1", className)}
    >
        <div className="text-center cursor-pointer">{course.course}</div>
        {
            course.years.map((year, yearIndex) =>
                <CourseYear
                    key={course.course + "_" + year.yearNumber}
                    year={year}
                    highlight={highlight.years[yearIndex]}
                />
            )
        }
    </div>;

export default Course;
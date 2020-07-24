import React, { FC } from "react";
import { list, getNextCourse, scrollIntoView } from "../utilities";
import CourseYear from "./CourseYear";
import { HCourse } from "../highlight";

interface CourseProps
{
    course: Course;
    highlight: HCourse;
    className?: string;
}

const Course: FC<CourseProps> = ({ course, highlight, className }) =>
{
    const scrollToNext = function ()
    {
        const next = getNextCourse(course.course);
        const behavior: ScrollIntoViewOptions = {
            behavior: "smooth",
            block: "start",
            inline: "start"
        };

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };

    return (
        <div
            key={course.course}
            id={"course_" + course.course}
            className={list("flex flex-column align-items-center mb-1", className)}
        >
            <div className="text-center cursor-pointer" onClick={scrollToNext}>{course.course}</div>
            {
                course.years.map((year, yearIndex) =>
                    <CourseYear
                        key={course.course + "_" + year.yearNumber}
                        year={year}
                        highlight={highlight.years[yearIndex]}
                    />
                )
            }
        </div>
    );
};

export default Course;
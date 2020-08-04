import React, { FC } from "react";
import { list, getNextCourse, scrollIntoView } from "../utilities";
import CourseYear from "./CourseYear";
import { HCourse, HYear, cloneHYear } from "../highlight";

interface CourseProps
{
    course: Course;
    highlight: HCourse;
    setHighlight: (value: HCourse) => void;
    className?: string;
}

const Course: FC<CourseProps> = ({ course, highlight, setHighlight, className }) =>
{
    const scrollToNext = function ()
    {
        const next = getNextCourse(course.course);

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };

    const setter = (value: HYear) =>
    {
        highlight.years[value.yearNumber / 100 - 1] = value;
        setHighlight(highlight);
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
                        highlight={cloneHYear (highlight.years[yearIndex])}
                        setHighlight={setter}
                    />
                )
            }
        </div>
    );
};

export default Course;
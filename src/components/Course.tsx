import React, { FC } from "react";
import { getNextCourse, scrollIntoView } from "../utilities/scrolling";
import { list } from "../utilities/css";
import CourseYear from "./CourseYear";
import { Course as HCourse } from "../highlight/modelds";
import { Course } from "../models";
import { DerivedAtom, derive } from "../hooks/useAtom";

interface CourseProps
{
    course: Course;
    highlight: DerivedAtom<HCourse>;
    className?: string;
}

const Course: FC<CourseProps> = ({ course, highlight, className }) =>
{
    const scrollToNext = function ()
    {
        const next = getNextCourse(course.course);

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };
    
    const years = derive(highlight, "years");

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
                        highlight={derive(years, yearIndex)}
                    />
                )
            }
        </div>
    );
};

export default Course;
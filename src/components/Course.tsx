import React, { FC } from "react";
import { getNextCourse, scrollIntoView } from "../utilities/scrolling";
import { list } from "../utilities/css";
import CourseYear from "./CourseYear";
import { Course as HCourse } from "../highlight/modelds";
import { Course as MCourse } from "../models";
import { DerivedAtom, derive } from "../hooks/useAtom";

interface CourseProps
{
    course: DerivedAtom<MCourse>;
    highlight: DerivedAtom<HCourse>;
    className?: string;
}

const Course: FC<CourseProps> = ({ course, highlight, className }) =>
{
    const years = derive(course, "years");
    const hYears = derive(highlight, "years");

    const courseId = course.get.course;

    const scrollToNext = function ()
    {
        const next = getNextCourse(courseId);

        scrollIntoView(document.getElementById("track_" + next));
        scrollIntoView(document.getElementById("course_" + next));
    };

    return (
        <div
            key={courseId}
            id={"course_" + courseId}
            className={list("flex flex-column align-items-center mb-1", className)}
        >
            <div className="text-center cursor-pointer" onClick={scrollToNext}>{courseId}</div>
            {
                course.get.years.map((year, yearIndex) =>
                    <CourseYear
                        key={courseId + "_" + year.yearNumber}
                        year={derive(years, yearIndex)}
                        highlight={derive(hYears, yearIndex)}
                    />
                )
            }
        </div>
    );
};

export default Course;
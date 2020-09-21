import React from "react";
import { Course as HCourse, HashMap } from "../highlight/modelds";
import { Course as MCourse } from "../models";
import Course from "./Course";
import { DerivedAtom, derive } from "../hooks/useAtom";

interface CoursePanelProps
{
    courses: DerivedAtom<MCourse[]>;
    highlight: DerivedAtom<HashMap<HCourse>>;
}

const CoursePanel = ({ courses, highlight }: CoursePanelProps) =>
{
    return (
        <>
            {
                courses.get.map((course, index) =>
                    <Course
                        key={course.course}
                        course={derive(courses, index)}
                        highlight={derive(highlight, course.course)}
                        className={index < courses.get.length - 1 ? "border-b-1" : ""}
                    />
                )
            }
        </>
    );
};

export default CoursePanel;
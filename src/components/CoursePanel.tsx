import React from "react";
import { Course as HCourse, HashMap } from "../highlight/modelds";
import { Course as MCourse } from "../models";
import Course from "./Course";
import { DerivedAtom, derive } from "../hooks/useAtom";

interface CoursePanelProps
{
    courses: MCourse[];
    highlight: DerivedAtom<HashMap<HCourse>>;
}

const CoursePanel = ({ courses, highlight }: CoursePanelProps) =>
{
    return (
        <>
            {
                courses.map((course, index) =>
                    <Course
                        key={course.course}
                        course={course}
                        highlight={derive(highlight, course.course)}
                        className={index < courses.length - 1 ? "border-b-1" : ""}
                    />
                )
            }
        </>
    );
};

export default CoursePanel;
import React from "react";
import { Course as HCourse, HashMap } from "../highlight/modelds";
import { Course as MCourse } from "../models";
import Course from "./Course";
import { DerivedAtom, derive } from "../hooks/useAtom";
import { EditEnv } from "../models/environment";

interface CoursePanelProps
{
    courses: DerivedAtom<MCourse[]>;
    highlight: DerivedAtom<HashMap<HCourse>>;
    env: EditEnv;
}

const CoursePanel = ({ courses, highlight, env }: CoursePanelProps) =>
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
                        env={env}
                    />
                )
            }
        </>
    );
};

export default CoursePanel;
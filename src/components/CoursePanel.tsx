import React from "react";
import { HCourse, HashMap } from "../highlight";
import Course from "./Course";

interface CoursePanelProps
{
    courses: Course[];
    highlight: HashMap<HCourse>;
}

const CoursePanel = ({ courses, highlight }: CoursePanelProps) =>
    <>
        {
            courses.map((course, index) =>
                <Course
                    key={course.course}
                    course={course}
                    highlight={highlight[course.course]}
                    className={index < courses.length - 1 ? "border-b-1" : ""}
                />
            )
        }
    </>;

export default CoursePanel;
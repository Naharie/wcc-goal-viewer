import React from "react";
import { HCourse, HashMap, cloneHCourse } from "../highlight";
import Course from "./Course";

interface CoursePanelProps
{
    courses: Course[];
    highlight: HashMap<HCourse>;
    setHighlight: (value: HashMap<HCourse>) => void;
}

const CoursePanel = ({ courses, highlight, setHighlight }: CoursePanelProps) =>
{
    const setter = (value: HCourse) =>
    {
        highlight[value.course] = value;
        setHighlight(highlight);
    };

    return (
        <>
            {
                courses.map((course, index) =>
                    <Course
                        key={course.course}
                        course={course}
                        highlight={cloneHCourse (highlight[course.course])}
                        className={index < courses.length - 1 ? "border-b-1" : ""}
                        setHighlight={setter}
                    />
                )
            }
        </>
    );
};

export default CoursePanel;
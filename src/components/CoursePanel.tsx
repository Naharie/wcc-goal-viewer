import React from "react";
import CourseYear from "./CourseYear";

interface CoursePanelProps
{
    courses: Course[];
}

const CoursePanel = ({ courses }: CoursePanelProps) =>
    <>
        {
            courses.map((course, index) =>
                <div key={course.course} className={"flex flex-column align-items-center mb-1" + (index < courses.length - 1 ? " border-b-1" : "")}>
                    <div className="text-center cursor-pointer">{course.course}</div>
                    {course.years.map(year => <CourseYear key={course.course + "_" + year.yearNumber} year={year} />)}
                </div>
            )
        }
    </>;

export default CoursePanel;
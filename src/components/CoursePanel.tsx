import React from "react";
import CourseYear from "./CourseYear";
import { HCourse, HashMap } from "../highlight";

interface CoursePanelProps
{
    courses: Course[];
    highlight: HashMap<HCourse>;
}

const CoursePanel = ({ courses, highlight }: CoursePanelProps) =>
    <>
        {
            courses.map((course, index) =>
                <div
                    key={course.course}
                    id={"course_" + course.course}
                    className={"flex flex-column align-items-center mb-1" + (index < courses.length - 1 ? " border-b-1" : "")}
                >
                    <div className="text-center cursor-pointer">{course.course}</div>
                    {
                        course.years.map((year, yearIndex) =>
                            <CourseYear
                                key={course.course + "_" + year.yearNumber}
                                year={year}
                                highlight={highlight[course.course].years[yearIndex]}
                            />
                        )
                    }
                </div>
            )
        }
    </>;

export default CoursePanel;
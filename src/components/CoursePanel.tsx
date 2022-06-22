import { selectCourses } from "../data";
import { useAppSelector } from "../hooks/redux";
import SimpleBar from "simplebar-react";
import Course from "./Course";

const CoursePanel = () =>
{
    const courses = useAppSelector(selectCourses);

    return (
        <SimpleBar className="h-full mt-6">
            {courses.map((course, index) =>
                <Course key={course.course} course={index} />
            )}
        </SimpleBar>
    );
};

export default CoursePanel;
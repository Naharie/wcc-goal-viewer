import SimpleBar from "simplebar-react";
import { useSnapshot } from "valtio";
import store from "../../data";
import Course from "./Course";

const CoursePanel = () =>
{
    const view = useSnapshot(store);
    const courses = view.data.courses;

    return (
        <SimpleBar className="h-full mt-6">
            {courses.map((course, index) =>
                <Course key={course.course} course={index} />
            )}
        </SimpleBar>
    );
};

export default CoursePanel;
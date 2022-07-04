import SimpleBar from "simplebar-react";
import { useSnapshot } from "valtio";
import store from "../../data";
import Course from "./Course";

const CoursePanel = () =>
{
    const view = useSnapshot(store);
    const courses = view.data.courses;
    const dimmed = view.editorId !== undefined;

    return (
        <SimpleBar className={"h-full pt-6" +  (dimmed ? " bg-dim-not-selected" : "")}>
            {courses.map((course, index) =>
                <Course key={course.course} course={index} />
            )}
        </SimpleBar>
    );
};

export default CoursePanel;
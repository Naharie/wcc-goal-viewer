import SimpleBar from "simplebar-react";
import useData from "../../data";
import useEditor from "../../data/editor";
import Course from "./Course";

const CoursePanel = () =>
{
    const courses = useData(data => data.courses);
    const dimmed = useEditor(editor => editor.id !== undefined);    

    return (
        <SimpleBar className={"h-full pt-6" +  (dimmed ? " bg-dim-not-selected" : "")}>
            {courses.map((course, index) =>
                <Course key={course.name} course={index} />
            )}
        </SimpleBar>
    );
};

export default CoursePanel;
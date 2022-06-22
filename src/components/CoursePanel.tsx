import SimpleBar from "simplebar-react";
import useStore from "../data";
import Course from "./Course";

const CoursePanel = () =>
{
    const courses = useStore(state => state.data.courses);

    return (
        <SimpleBar className="h-full mt-6">
            {courses.map((course, index) =>
                <Course key={course.course} course={index} />
            )}
        </SimpleBar>
    );
};

export default CoursePanel;
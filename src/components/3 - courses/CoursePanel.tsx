import { useAtom } from "jotai";
import SimpleBar from "simplebar-react";
import { coursesAtom, selectCourse } from "../../data";
import Course from "./Course";

const CoursePanel = () =>
{
    const [courses] = useAtom(coursesAtom);

    return (
        <SimpleBar className="h-full mt-6">
            {courses.map((course, index) =>
                <Course key={course.course} selector={[selectCourse(index), index]} />
            )}
        </SimpleBar>
    );
};

export default CoursePanel;
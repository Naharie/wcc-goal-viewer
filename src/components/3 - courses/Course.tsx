import { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import CourseYear from "./CourseYear";

const Course = ({ course: index }: PropsWithChildren<{ course: number }>) =>
{
    const view = useSnapshot(store);
    const course = view.data.courses[index];

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{course.name}</a>
            {course.years.map((year, yearIndex) =>
                <CourseYear key={year.number} course={index} year={yearIndex} />
            )}
        </div>
    );
};

export default Course;
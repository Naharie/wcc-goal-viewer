import { selectCourse } from "../data";
import { useAppSelector } from "../hooks/redux";
import CourseYear from "./CourseYear";

const Course = ({ course: index }: { course: number }) =>
{
    const course = useAppSelector(selectCourse(index));

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{course.course}</a>
            {course.years.map((_, year) =>
                <CourseYear course={index} year={year} />
            )}
        </div>
    );
};

export default Course;
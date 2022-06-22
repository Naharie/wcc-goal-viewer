import useStore from "../data";
import CourseYear from "./CourseYear";

const Course = ({ course: index }: { course: number }) =>
{
    const course = useStore(state => state.data.courses[index]);

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{course.course}</a>
            {course.years.map((year, yearIndex) =>
                <CourseYear key={year.number} course={index} year={yearIndex} />
            )}
        </div>
    );
};

export default Course;
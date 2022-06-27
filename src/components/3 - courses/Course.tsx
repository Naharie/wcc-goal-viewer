import { FC } from "react";
import { selectYear, Selector } from "../../data";
import useSelector from "../../hooks/useSelector";
import { Course as CourseData } from "../../data/types";
import CourseYear from "./CourseYear";

interface CourseProps
{
    selector: Selector<CourseData>;
}

const Course: FC<CourseProps> = ({ selector }) =>
{
    const [course,, courseAtom] = useSelector(selector);

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{course.course}</a>
            {course.years.map((year, index) =>
                <CourseYear key={year.number} selector={[selectYear(courseAtom, index), index]} />
            )}
        </div>
    );
};

export default Course;
import { FC } from "react";
import { selectCourseGoal, Selector } from "../../data";
import useSelector from "../../hooks/useSelector";
import { Semester } from "../../data/types";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    semesterNumber: number;
    selector: Selector<Semester>;
}

const CourseSemester: FC<CourseSemesterProps> = ({ semesterNumber, selector }) =>
{
    const [semester,, semesterAtom] = useSelector(selector);

    if (semester.length === 0)
    {
        return (<div className="flex-1 mb-4 mx-8"></div>);
    }

    return (
        <div className="flex-1 mb-4 mx-8">
            <a className="block text-center no-underline text-black mb-4">
                {semesterNumber}
            </a>
            <ol className="list-[upper-alpha]">
                {semester.map((goal, index) =>
                    <CourseGoal key={goal.id} selector={[ selectCourseGoal(semesterAtom, index), index]} />
                )}
            </ol>
        </div>
    );
};

export default CourseSemester;
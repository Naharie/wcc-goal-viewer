import { FC, useMemo } from "react";
import { selectSemester, Selector } from "../../data";
import useSelector from "../../hooks/useSelector";
import { Year } from "../../data/types";
import CourseSemester from "./CourseSemester";

interface CourseYearProps
{
    selector: Selector<Year>;
}

const CourseYear: FC<CourseYearProps> = ({ selector }) =>
{
    const [year,, yearAtom] = useSelector(selector);

    return (
        <div className="flex justify-center w-full">
            <CourseSemester semesterNumber={year.number + 1} selector={[ selectSemester(yearAtom, 0) ]} />
            <CourseSemester semesterNumber={year.number + 2} selector={[ selectSemester(yearAtom, 1) ]} />
        </div>
    );
};

export default CourseYear;
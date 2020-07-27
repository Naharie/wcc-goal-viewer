import React from "react";
import CourseSemester from "./CourseSemester";
import { HYear, HashMap, HGoal, cloneHSemester } from "../highlight";

interface CourseYearProps
{
    year: Year;
    highlight: HYear;
    setHighlight: (value: HYear) => void;
}

const CourseYear = ({ year, highlight, setHighlight }: CourseYearProps) =>
{
    const setter1 = (value: HashMap<HGoal>) =>
    {
        highlight.semester1 = value;
        setHighlight(highlight);
    };
    const setter2 = (value: HashMap<HGoal>) =>
    {
        highlight.semester2 = value;
        setHighlight(highlight);
    };

    return (
        <div className="flex justify-content-center w-100">
            <CourseSemester
                year={year.yearNumber + 1}
                semester={year.semester1}
                highlight={cloneHSemester(highlight.semester1)}
                setHighlight={setter1}
            />
            <CourseSemester
                year={year.yearNumber + 2}
                semester={year.semester2}
                highlight={cloneHSemester (highlight.semester2)}
                setHighlight={setter2}
            />
        </div>
    );
};

export default CourseYear;
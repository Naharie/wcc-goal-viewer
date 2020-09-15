import React, { FC } from "react";
import CourseSemester from "./CourseSemester";
import { Goal, Year as HYear, HashMap } from "../highlight/modelds";
import { Year } from "../models";
import { TransformedAtom, derive } from "../hooks/useAtom";

interface CourseYearProps
{
    year: Year;
    highlight: TransformedAtom<HYear>;
}

const CourseYear: FC<CourseYearProps> = ({ year, highlight }) =>
{
    return (
        <div className="flex justify-content-center w-100">
            <CourseSemester
                year={year.yearNumber + 1}
                semester={year.semester1}
                highlight={derive(highlight, "semester1")}
            />
            <CourseSemester
                year={year.yearNumber + 2}
                semester={year.semester2}
                highlight={derive(highlight, "semester2")}
            />
        </div>
    );
};

export default CourseYear;
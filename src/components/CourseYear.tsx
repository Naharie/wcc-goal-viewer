import React, { FC } from "react";
import CourseSemester from "./CourseSemester";
import { Goal, Year as HYear, HashMap } from "../highlight/modelds";
import { Year } from "../models";
import { DerivedAtom, derive } from "../hooks/useAtom";
import { EditEnv } from "../models/environment";

interface CourseYearProps
{
    year: DerivedAtom<Year>;
    highlight: DerivedAtom<HYear>;
    env: EditEnv;
}

const CourseYear: FC<CourseYearProps> = ({ year, highlight, env }) =>
{
    return (
        <div className="flex justify-content-center w-100">
            <CourseSemester
                year={year.get.yearNumber + 1}
                semester={derive(year, "semester1")}
                highlight={derive(highlight, "semester1")}
                env={env}
            />
            <CourseSemester
                year={year.get.yearNumber + 2}
                semester={derive(year, "semester2")}
                highlight={derive(highlight, "semester2")}
                env={env}
            />
        </div>
    );
};

export default CourseYear;
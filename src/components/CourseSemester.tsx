import React from "react";
import { Goal, HashMap } from "../highlight/modelds";
import { Semester } from "../models";
import { DerivedAtom, derive } from "../hooks/useAtom";
import CourseGoal from "./CourseGoal";
import useCanEdit from "../hooks/useCanEdit";
import AddButton from "./AddButton";
import { EditEnv } from "../models/environment";

interface CourseSemesterProps
{
    year: number;
    semester: DerivedAtom<Semester>;
    highlight: DerivedAtom<HashMap<Goal>>
    env: EditEnv;
}

const CourseSemester = ({ year, semester, highlight, env }: CourseSemesterProps) =>
{
    const canEdit = useCanEdit();

    return (
        <div className="flex-1">
            <div className="text-center cursor-pointer mb-1">{year}</div>
            <ol type="A">
                {
                    semester.get.map((goal, index) =>
                        <CourseGoal
                            key={goal.id}
                            goal={derive(semester, index)}
                            highlight={derive(highlight, goal.id)}
                            env={env}
                        />
                    )
                }
            </ol>
            {canEdit ? <AddButton /> : null}
        </div>
    );
};

export default CourseSemester;
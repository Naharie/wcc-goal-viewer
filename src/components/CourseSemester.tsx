import React from "react";
import { HGoal } from "../highlight";

interface CourseSemesterProps
{
    year: number;
    semester: Semester;
    highlight: HGoal[];
}

const renderReferences = (references: string[]) =>
{
    if (references.length === 0)
    {
        return ("");
    }

    return ("(" + references.join(", ") + ")");
};

const CourseSemester = ({ year, semester }: CourseSemesterProps) =>
    <div className="flex-1">
        <div className="text-center cursor-pointer mb-1">{year}</div>
        <ol type="A">
            {
                semester.map(goal =>
                    <li className="mb-1-3" key={goal.id}>{goal.text} {renderReferences(goal.references)}</li>
                )
            }
        </ol>
    </div>;

export default CourseSemester;
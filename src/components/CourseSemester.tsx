import React from "react";
import { HGoal, HashMap } from "../highlight";
import { list } from "../utilities";

interface CourseSemesterProps
{
    year: number;
    semester: Semester;
    highlight: HashMap<HGoal>;
}

const renderReferences = (references: string[]) =>
{
    if (references.length === 0)
    {
        return ("");
    }

    return ("(" + references.join(", ") + ")");
};

const CourseSemester = ({ year, semester, highlight }: CourseSemesterProps) =>
    <div className="flex-1">
        <div className="text-center cursor-pointer mb-1">{year}</div>
        <ol type="A">
            {
                semester.map(goal =>
                    <li
                        className={list("mb-1-3", highlight[goal.id].selected ? "selected" : "")}
                        key={goal.id}
                    >
                        {goal.text} {renderReferences(goal.references)}
                    </li>
                )
            }
        </ol>
    </div>;

export default CourseSemester;
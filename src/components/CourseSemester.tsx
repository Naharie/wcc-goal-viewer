import React from "react";
import { HGoal, HashMap } from "../highlight";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    year: number;
    semester: Semester;
    highlight: HashMap<HGoal>;
    setHighlight: (value: HashMap<HGoal>) => void;
}

const CourseSemester = ({ year, semester, highlight, setHighlight }: CourseSemesterProps) =>
{
    const setter = (value: HGoal) =>
    {
        highlight[value.id] = value;
        setHighlight(highlight);
    };

    return (
        <div className="flex-1">
            <div className="text-center cursor-pointer mb-1">{year}</div>
            <ol type="A">
                {
                    semester.map(goal =>
                        <CourseGoal
                            key={goal.id}
                            goal={goal}
                            highlight={highlight[goal.id]}
                            setHighlight={setter}
                        />
                    )
                }
            </ol>
        </div>
    );
};

export default CourseSemester;
import React from "react";
import { HGoal, HashMap } from "../highlight";
import CourseGoal from "./CourseGoal";
import useCanEdit from "../utilities/useCanEdit";
import AddButton from "./AddButton";

interface CourseSemesterProps
{
    year: number;
    semester: Semester;
    highlight: HashMap<HGoal>;
    setHighlight: (value: HashMap<HGoal>) => void;
}

const CourseSemester = ({ year, semester, highlight, setHighlight }: CourseSemesterProps) =>
{
    const canEdit = useCanEdit();

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
            {canEdit ? <AddButton /> : null}
        </div>
    );
};

export default CourseSemester;
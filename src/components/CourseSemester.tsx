import React from "react";
import { HGoal, HashMap } from "../highlight";
import { list } from "../utilities";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    year: number;
    semester: Semester;
    highlight: HashMap<HGoal>;
}

const CourseSemester = ({ year, semester, highlight }: CourseSemesterProps) =>
    <div className="flex-1">
        <div className="text-center cursor-pointer mb-1">{year}</div>
        <ol type="A">
            {
                semester.map(goal =>
                    <CourseGoal key={goal.id} goal={goal} highlight={highlight[goal.id]} />
                )
            }
        </ol>
    </div>;

export default CourseSemester;
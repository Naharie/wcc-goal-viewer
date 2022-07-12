import React, { useState } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import { propagateScores } from "../../data/scores";
import useCourseGoal from "../../data/views/3 - courses/useCourseGoal";
import GoalBase from "../GoalBase";
import BadgeButton from "../scores/BadgeButton";
import ScoreSelector from "../scores/ScoreSelector";

interface CourseGoalProps
{
    course: number;
    year: number;
    semester: number;
    goal: number;
}

const CourseGoal = ({ course: courseIndex, year, semester, goal: goalIndex }: CourseGoalProps) =>
{
    const { goal, scores, editableScores, highlighted} = useCourseGoal(courseIndex, year, semester, goalIndex);
    const [addingScores, setAddingScores] = useState(false);

    const toggleAddingScores = () => setAddingScores(value => !value);

    const addScore = () =>
    {
        editableScores.push(0);
        propagateScores();
    };
    const deleteScore = (index: number) => () =>
    {
        editableScores.splice(index, 1);
        propagateScores();
    };
    const setScore = (index: number) => (score: number) =>
    {
        editableScores[index] = score;
        propagateScores();
    };

    return (
        <GoalBase goal={goal} highlighted={highlighted} className={"mb-4 p-1"} onClick={toggleAddingScores}>
            {goal.references.length > 0 ? ` (${goal.references.join(", ")})` : ""}.
            
            <div>
            {scores.map((score, index) =>
                <ScoreSelector key={index} className="mr-3" value={score} onSetScore={setScore(index)} onDelete={deleteScore(index)} />
            )}
            {addingScores ? <BadgeButton value="+" onClick={addScore} /> : null}
            </div>
        </GoalBase>
    );
};

export default CourseGoal;
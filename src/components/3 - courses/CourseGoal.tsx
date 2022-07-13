import React, { useState } from "react";
import useData from "../../data";
import propagateScores from "../../data/actions/scores/propagation/propagateScores";
import useHighlight from "../../data/highlight";
import useScores from "../../data/scores";
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
    const course = useData(data => data.courses[courseIndex]);
    const goal = course.years[year].semesters[semester][goalIndex];
    
    const scores = useScores(scores => scores.courses[course.name][goal.ref]);
    const updateScores = useScores(scores => scores.update);
    //const dimmed = useEditor(editor => editor.id !== undefined && editor.id !== goal.id);
    //const editable = useEditor(editor => editor.id === goal.id);
    
    const highlighted = useHighlight(highlight => highlight.courses[course.name][goal.ref]);

    const [addingScores, setAddingScores] = useState(false);

    const toggleAddingScores = () => setAddingScores(value => !value);

    const addScore = () =>
    {
        updateScores(scores =>
        {
            scores.courses[course.name][goal.ref].push(0);
        });
        propagateScores();
    };
    const deleteScore = (index: number) => () =>
    {
        updateScores(scores =>
        {
            scores.courses[course.name][goal.ref].splice(index, 1);
        });
        propagateScores();
    };
    const setScore = (index: number) => (score: number) =>
    {
        updateScores(scores =>
        {
            scores.courses[course.name][goal.ref][index] = score;
        });
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
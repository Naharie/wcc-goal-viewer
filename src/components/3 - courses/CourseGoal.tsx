import React, { useState } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import { propagateScores } from "../../data/scores";
import chooseBackground from "../../utilities/choose-background";
import BadgeButton from "../scores/BadgeButton";
import ScoreSelector from "../scores/ScoreSelector";

interface CourseGoalProps
{
    course: number;
    year: number;
    semester: number;
    goal: number;
}

const CourseGoal = ({ course: courseIndex, year, semester, goal: goalIndex, captureClick }: CourseGoalProps) =>
{
    const view = useSnapshot(store);
    const [addingScores, setAddingScores] = useState(false);

    const course = view.data.courses[courseIndex];
    const goal = course.years[year].semesters[semester][goalIndex];

    const highlighted = view.highlight.courses[course.course][goal.ref];
    const dimmed = view.editorId !== undefined && view.editorId != goal.id;

    const scores = view.scores.courses[course.course][goal.ref];

    const toggleAddingScores = (event: React.MouseEvent<HTMLLIElement>) =>
    {
        if (event.target !== event.currentTarget || dimmed) return;
        setAddingScores(value => !value);
    };

    const addScore = () =>
    {
        store.scores.courses[course.course][goal.ref].push(0);
        propagateScores();
    };
    const deleteScore = (index: number) => () =>
    {
        store.scores.courses[course.course][goal.ref].splice(index, 1);
        propagateScores();
    };
    const setScore = (index: number) => (score: number) =>
    {
        store.scores.courses[course.course][goal.ref][index] = score;
        propagateScores();
    };

    return (
        <li className={"list-item mb-4 rounded-md p-1" + chooseBackground(highlighted, dimmed)} onClick={toggleAddingScores}>
            {goal.text}
            {
                goal.references.length > 0 ? ` (${goal.references.join(", ")})` : ""
            }
            .
            <div>
            {scores.map((score, index) =>
                <ScoreSelector key={index} className="mr-3" value={score} onSetScore={setScore(index)} onDelete={deleteScore(index)} />
            )}
            {addingScores ? <BadgeButton value="+" onClick={addScore} /> : null}
            </div>
        </li>
    );
};

export default CourseGoal;
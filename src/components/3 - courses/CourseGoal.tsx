import { useState } from "react";
import { closeEditor } from "../../data/editor";
import validator from "../../validators/courseGoalReferencesValidator";
import GoalBase from "../GoalBase";
import BadgeButton from "../scores/BadgeButton";
import ScoreSelector from "../scores/ScoreSelector";
import { addCourseGoalScore, deleteCourseGoalScore, propagateScores, setCourseGoalScore, useCourseGoalScores } from "../../data/scores";
import { useCourseGoalHighlight } from "../../data/highlight";
import { deleteCourseGoal, updateCourseGoal, useData } from "../../data";

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
    
    const scores = useCourseGoalScores(course.name, goal.ref);
    
    const highlighted = useCourseGoalHighlight(course.name, goal.ref);
    const [addingScores, setAddingScores] = useState(false);

    const toggleAddingScores = () => setAddingScores(value => !value);

    const addScore = () => addCourseGoalScore(course.name, goal.ref);
    const deleteScore = (index: number) => () => deleteCourseGoalScore(course.name, goal.ref)(index);
    const setScore = setCourseGoalScore(course.name, goal.ref);

    const saveGoal = (text: string) =>
    {
        updateCourseGoal(courseIndex, year, semester, goalIndex, text, goal.references);
        closeEditor();
    };
    const saveReferences = (value: string) =>
    {
        const references = value.split(", ").map(part => part.trim()).filter(part => part !== "");
        updateCourseGoal(courseIndex, year, semester, goalIndex, goal.text, references);
        propagateScores();
    };
    const deleteGoal = () =>
    {
        deleteCourseGoal(courseIndex, year, semester, goalIndex);
        closeEditor();
    };

    return (
        <GoalBase
            goal={goal}
            highlighted={highlighted}
            className={"mb-4 p-1"}
            references={{
                value: goal.references.length > 0 ? `${goal.references.join(", ")}` : "",
                validator: validator(course.name),
                saveReferences
            }}
            saveGoal={saveGoal}
            deleteGoal={deleteGoal}
            onClick={toggleAddingScores}
        >   
            <div>
                {scores.map((score, index) =>
                    <ScoreSelector key={index} className="mr-3" value={score} onSelectScore={setScore(index)} onDelete={deleteScore(index)} />
                )}
                {addingScores && <BadgeButton value="+" onClick={addScore} />}
            </div>
        </GoalBase>
    );
};

export default CourseGoal;
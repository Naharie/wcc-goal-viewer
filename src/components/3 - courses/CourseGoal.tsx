import { useSnapshot } from "valtio";
import store from "../../data";
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
    const view = useSnapshot(store);

    const course = view.data.courses[courseIndex];
    const goal = course.years[year].semesters[semester][goalIndex];

    const highlighted = view.highlight.courses[course.course][goal.ref];
    const scores = view.scores.courses[course.course][goal.ref];

    return (
        <li className={"list-item mb-4 rounded-md p-1" + (highlighted ? " bg-selected" : "")}>
            {goal.text}
            {
                goal.references.length > 0 ? ` (${goal.references.join(", ")})` : ""
            }
            .
            {scores.map(score =>
                <ScoreSelector value={score} />
            )}
        </li>
    );
};

export default CourseGoal;
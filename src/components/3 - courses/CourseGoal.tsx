import { useSnapshot } from "valtio";
import store from "../../data";

interface CourseGoalProps
{
    course: number;
    year: number;
    semester: number;
    goal: number;
}

const CourseGoal = ({ course, year, semester, goal: goalIndex }: CourseGoalProps) =>
{
    const view = useSnapshot(store);
    const goal = view.data.courses[course].years[year].semesters[semester][goalIndex];

    return (
        <li className="list-item mb-4">
            {goal.text}
        </li>
    );
};

export default CourseGoal;
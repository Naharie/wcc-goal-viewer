import { selectCourseGoal } from "../data";
import { useAppSelector } from "../hooks/redux";

interface CourseGoalProps
{
    course: number;
    year: number;
    semester: number;
    goal: number;
}

const CourseGoal = ({ course, year, semester, goal: goalIndex }: CourseGoalProps) =>
{
    const goal = useAppSelector(selectCourseGoal(course, year, semester, goalIndex));

    return (
        <li className="list-item mb-4">
            {goal.text}
        </li>
    );
};

export default CourseGoal;
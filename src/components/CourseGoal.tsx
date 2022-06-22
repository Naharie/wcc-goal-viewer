import useStore from "../data";

interface CourseGoalProps
{
    course: number;
    year: number;
    semester: number;
    goal: number;
}

const CourseGoal = ({ course, year, semester, goal: goalIndex }: CourseGoalProps) =>
{
    const goal = useStore(state => state.data.courses[course].years[year].semesters[semester][goalIndex]);

    return (
        <li className="list-item mb-4">
            {goal.text}
        </li>
    );
};

export default CourseGoal;
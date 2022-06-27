import { Selector } from "../../data";
import useSelector from "../../hooks/useSelector";
import { CourseGoal as CourseGoalData } from "../../data/types";

interface CourseGoalProps
{
    selector: Selector<CourseGoalData>;
}

const CourseGoal = ({ selector }: CourseGoalProps) =>
{
    const [goal] = useSelector(selector);

    return (
        <li className="list-item mb-4">
            {goal.text}
        </li>
    );
};

export default CourseGoal;
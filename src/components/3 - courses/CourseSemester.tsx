import { PropsWithChildren } from "react";
import useData from "../../data";
import swapCourseGoals from "../../data/actions/data/swap/courseGoals";
import useEditor from "../../data/editor";
import { nextLowercaseLetter, nextUppercaseLetter } from "../../utilities/alphabet";
import nextGoalId from "../../utilities/goal-id";
import SortableList from "../sortable/SortableList";
import CourseGoal from "./CourseGoal";

interface CourseSemesterProps
{
    course: number;
    year: number;
    semesterIndex: number;
}

const CourseSemester = ({ course: course, year, semesterIndex }: PropsWithChildren<CourseSemesterProps>) =>
{
    const update = useData(data => data.update);
    const editorEnabled = useEditor(editor => editor.enabled);

    const semester = useData(data => data.courses[course].years[year].semesters[semesterIndex]);
    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);

    const goals = 
        semester.map((goal, index) =>
        ({
            id: goal.id.toString(),
            value: <CourseGoal key={goal.id} course={course} year={year} semester={semesterIndex} goal={index} />
        }));

    const addGoal = () =>
    {
        update(data =>
        {
            const semester = data.courses[course].years[year].semesters[semesterIndex];
            const id = nextGoalId();
            const ref = semester.length === 0 ? "A" : nextUppercaseLetter(semester[semester.length - 1].ref);

            semester.push({
                text: "== PLACEHOLDER ==",
                id, ref,
                references: []
            });
        });
    };

    if (semester.length === 0)
    {
        return (<div className="flex-1 mb-4 mx-4"></div>);
    }

    return (
        <div className="flex-1 mb-4 mx-4">
            <a className="block text-center no-underline text-black mb-4">
                {(year + 1) * 100 + semesterIndex + 1}
            </a>
            <SortableList
                className="list-[upper-alpha]"
                dragId={"curriculum-" + course + "-" + year + "-" + semesterIndex}
                items={goals}
                lockXAxis
                allowSorting={allowSorting}
                onSwap={swapCourseGoals(course, year, semesterIndex)}
            />
            {/*editorEnabled ?
                <div className="flex justify-center items-center pt-2 pb-6">
                    <button className="w-full bg-gray-400 hover:bg-gray-500 rounded-md text-center" onClick={addGoal}>+</button>
                </div> :
            null*/}
        </div>
    );
};

export default CourseSemester;
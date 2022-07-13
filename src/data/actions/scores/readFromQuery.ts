import { getQuery } from "../../../utilities/query-parameter";
import useScores from "../../scores";
import propagateScores from "./propagation/propagateScores";

const readScoresFromQuery = () =>
{
    const query = getQuery();
    const scores = query["scores"]?.split(" ")?.join("");

    if (scores === undefined || scores === "") return;

    const courses = scores.split("|").map(course => course.split("@"));
    if (courses.length === 0) return;

    const update = useScores.getState().update;

    update (scores =>
    {
        for (const [name, course] of courses)
        {
            for (const [goal, values] of course.split(",").map(goal => goal.split(":")))
            {
                scores.courses[name][goal] = values.split("").map(v => parseInt(v));
            }
        }
    });

    propagateScores();
};

export default readScoresFromQuery;
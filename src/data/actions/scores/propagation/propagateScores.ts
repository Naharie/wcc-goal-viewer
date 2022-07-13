import { setQueryParameter } from "../../../../utilities/query-parameter";
import useScores from "../../../scores";
import clearPropagatedScores from "./clearPropagatedScores";
import propagateScoresToCurriculumGoals from "./propagateScoresToCurriculumGoals";
import propagateScoresToTracks from "./propagateScoresToTracks";

const propagateScores = () =>
{
    clearPropagatedScores();
    propagateScoresToTracks();
    propagateScoresToCurriculumGoals();

    const store = useScores.getState();

    const scores =
        Object.entries(store.courses).map(([name, course]) =>
        {
            const nested = Object.entries(course).filter(([, scores]) => scores.length > 0).map (([goal, scores]) => goal + ":" + scores.join("")).join(",");
            return name + "@" + nested;
        }).filter(value => !value.endsWith("@")).join("|");

    setQueryParameter("scores", scores);
};

export default propagateScores;
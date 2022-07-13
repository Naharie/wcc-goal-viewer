import useData from "../../..";
import useScores from "../../../scores";

const propagateScoresToTracks = () =>
{
    const courses = useData.getState().courses;
    const update = useScores.getState().update;

    update (scores =>
    {
        for (const { name: course, years } of courses)
        {
            for (const { semesters } of years)
            {
                for (const semester of semesters)
                {
                    for (const goal of semester)
                    {
                        for (const reference of goal.references)
                        {
                            scores.tracks[course][reference].push(...scores.courses[course][goal.ref]);
                        }
                    }
                }
            }
        }
    });
};

export default propagateScoresToTracks;
import { JsonData } from "../../json";

const swapTrackReferences = (data: JsonData, track: string, refA: string, refB: string) =>
{
    const course = data.courses.find(({ name: course }) => course === track);
    if (course === undefined) return;
    
    for (const year of course.years)
    {
        for (const semester of year.semesters)
        {
            for (const goal of semester)
            {
                for (let i = 0; i < goal.references.length; i++)
                {
                    if (goal.references[i] === refA)
                    {
                        goal.references[i] = refB;
                    }
                    else if (goal.references[i] === refB)
                    {
                        goal.references[i] = refA;
                    }
                }
            }
        }
    }
};

export default swapTrackReferences;
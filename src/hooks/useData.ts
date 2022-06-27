import { useAtom } from "jotai";
import { useEffect } from "react";
import { coursesAtom, curriculumGoalsAtom, errorMessageAtom, isLoadedAtom, tracksAtom } from "../data";
import { GoalData } from "../data/types";

const useData = () =>
{
    const [, setLoaded] = useAtom(isLoadedAtom);
    const [, setErrorMessage] = useAtom(errorMessageAtom);

    const [, setCurriculumGoals] = useAtom(curriculumGoalsAtom);
    const [, setTracks] = useAtom(tracksAtom);
    const [, setCourses] = useAtom(coursesAtom);

    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((data: GoalData) =>
            {
                setCurriculumGoals(data.curriculumGoals);
                setTracks(data.tracks);
                setCourses(data.courses);
                setLoaded(true);
            })
            .catch((_: Error) =>
            {
                setErrorMessage("Failed to load goal data");
                setLoaded(true);
            });
    }, []);
};

export default useData;
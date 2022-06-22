import { useEffect } from "react";
import useStore from "../data";
import { GoalData } from "../types/data";

const useData = () =>
{
    const loadCompleted = useStore(state => state.loadCompleted);
    const loadFailed = useStore(state => state.loadFailed);

    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((data: GoalData) => loadCompleted(data))
            .catch((_: Error) => loadFailed("Failed to load goal data"));
    }, []);
};

export default useData;
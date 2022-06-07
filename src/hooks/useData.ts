import { useEffect } from "react";
import { dataLoadCompleted, dataLoadFailed } from "../data";
import { useAppDispatch } from "./redux";
import { GoalData } from "../types/data";

const useData = () =>
{
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((json: GoalData) => dispatch(dataLoadCompleted(json)))
            .catch((error: Error) => dispatch(dataLoadFailed(error)));
    }, []);
};

export default useData;
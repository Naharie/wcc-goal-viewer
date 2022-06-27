import { useEffect } from "react";
import store from "../data";
import { prepareHighlight } from "../data/highlight";
import { GoalData } from "../data/types";

const useData = () =>
{
    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((data: GoalData) =>
            {
                store.data = data;
                prepareHighlight(data);
                store.isLoaded = true;
            })
            .catch((_: Error) =>
            {
                store.errorMessage = "Sorry, something went wrong while loading the goal data.";
                store.isLoaded = true;
            });
    }, []);
};

export default useData;
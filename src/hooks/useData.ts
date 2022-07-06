import { useEffect } from "react";
import store from "../data";
import { prepareHighlight } from "../data/highlight";
import { prepareScores } from "../data/scores";
import { JsonData } from "../data/json";

/**
 * Fetches the json file containing all the goal data.
 */
const useData = () =>
{
    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((data: JsonData) =>
            {
                store.data = data;
                prepareHighlight(data);
                prepareScores(data);
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
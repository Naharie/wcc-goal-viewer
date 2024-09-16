import { useData } from "./data";
import { setError, setLoaded } from "./data/loadingStatus";
import { JsonData } from "./data/validation";

/**
 * Fetches the json file containing all the goal data.
 */
export const fetchData = () =>
{
    fetch("/data.json")
        .then(response => response.json())
        .then((data: JsonData) =>
        {
            useData.getState().set(data);
            setLoaded();
        })
        .catch((_: Error) => setError("Sorry, something went wrong while loading the goal data."));
};
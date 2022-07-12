import { useEffect } from "react";
import { setData, setLoaded } from "../data/actions/goals";
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
                setData(data);
                setLoaded();
            })
            .catch((_: Error) =>
                setLoaded("Sorry, something went wrong while loading the goal data.")
            );
    }, []);
};

export default useData;
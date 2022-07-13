import { useEffect } from "react";
import useData from "../data";
import prepareHighlight from "../data/actions/highlight/prepareHighlight";
import prepareScores from "../data/actions/scores/prepareScores";
import { JsonData } from "../data/json";
import useLoadingStatus from "../data/loadingStatus";

/**
 * Fetches the json file containing all the goal data.
 */
const useFetchData = () =>
{
    const setData = useData(data => data.set);
    const setLoaded = useLoadingStatus(status => status.setLoaded);

    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((data: JsonData) =>
            {
                setData(data);

                prepareHighlight(data);
                prepareScores(data);

                setLoaded();
            })
            .catch((_: Error) =>
                setLoaded("Sorry, something went wrong while loading the goal data.")
            );
    }, []);
};

export default useFetchData;
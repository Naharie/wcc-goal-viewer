import { useEffect } from "react";
import useData from "../data";
import prepareHighlight from "../data/actions/highlight/prepareHighlight";
import prepareScores from "../data/actions/scores/prepareScores";
import { JsonData } from "../data/validation";
import useLoadingStatus from "../data/loadingStatus";

export const loadData = (data: JsonData) =>
{
    const setData = useData.getState().set;

    setData(data);

    prepareHighlight(data);
    prepareScores(data);
};

/**
 * Fetches the json file containing all the goal data.
 */
const useFetchData = () =>
{
    const setLoaded = useLoadingStatus(status => status.setLoaded);

    useEffect(() =>
    {
        fetch("/data.json")
            .then(response => response.json())
            .then((data: JsonData) =>
            {
                loadData(data);
                setLoaded();
            })
            .catch((_: Error) =>
                setLoaded("Sorry, something went wrong while loading the goal data.")
            );
    }, []);
};

export default useFetchData;
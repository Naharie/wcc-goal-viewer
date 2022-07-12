import store from "..";
import { prepareHighlight } from "../highlight";
import { JsonData } from "../json";
import { prepareScores } from "../scores";

export const setLoaded = (error?: string) =>
{
    store.isLoaded = true;
    store.errorMessage = error ?? null;
};
export const setData = (data: JsonData) =>
{
    store.data = data;
    prepareHighlight(data);
    prepareScores(data);
};
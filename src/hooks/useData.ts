import { useState, useEffect, useRef, MutableRefObject } from "react";
import { JsonData } from "../models";

const useData = (onLoad: (data: JsonData) => void): [ boolean, JsonData, MutableRefObject<JsonData> ] =>
{
    const [data, setData] = useState<JsonData>({
        primaryGoals: [],
	    tracks: [],
	    courses: []
    });
    const ref = useRef<JsonData>(data);

    const [isLoading, setLoading] = useState(true);

    useEffect (() =>
    {
        if (!isLoading)
        {
            return (() => {});
        }

        let isMounted = true;

        fetch("./data.json")
            .then(response => response.json())
            .then(data =>
            {
                if (!isMounted)
                {
                    return;
                }

                ref.current = data;
                setData(data);

                onLoad(data);
                setLoading(false);
            });

        return (() => isMounted = false);
    }, [ onLoad, isLoading ]);

    return ([ isLoading, data, ref ]);
};

export default useData;
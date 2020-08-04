import { useState, useEffect } from "react";

const useData = (onLoad: (data: JsonData) => void): [ boolean, JsonData ] =>
{
    const [data, setData] = useState<JsonData>({
        primaryGoals: [],
	    tracks: [],
	    courses: []
    });
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

                setData(data);
                onLoad(data);
                setLoading(false);
            });

        return (() => isMounted = false);
    }, [ onLoad, isLoading ]);

    return ([ isLoading, data ]);
};

export default useData;
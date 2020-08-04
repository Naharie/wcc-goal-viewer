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
        const controller = new AbortController();
        let isMounted = true;

        fetch("./data.json", { signal: controller.signal })
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

        return (() =>
        {
            isMounted = false;
            controller.abort();
        });
    }, [ onLoad ]);

    return ([ isLoading, data ]);
};

export default useData;
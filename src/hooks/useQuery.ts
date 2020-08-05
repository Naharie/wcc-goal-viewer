interface QueryParameters
{
    [key: string]: string;
}

interface SettableQueryParameters
{
    [key: string]: string | null | undefined;
}

let oldQuery = "";
let cache: QueryParameters = {};

const useQuery = (): [QueryParameters, (value: SettableQueryParameters) => void] =>
{
    if (window.location.search !== "" && window.location.search !== oldQuery)
    {
        cache = {};

        const pairs = window.location.search.substring(1).split("&");

        for (const pair of pairs)
        {
            const [name, value] = pair.split("=");
            cache[decodeURIComponent(name)] = decodeURIComponent(value);
        }
    }

    const set = (query: SettableQueryParameters) =>
    {
        const baseUrl = window.location.origin + window.location.pathname + window.location.hash.split("?")[0];
        
        const queryString =
            Object.entries(
                Object.assign({}, cache, query)
            )
                .filter(([, value]) => value !== null && value !== undefined)
                .map (([ name, value ]) =>
                    encodeURIComponent(name) + "=" + encodeURIComponent(value + "")
                ).join("&");

        if (queryString !== "")
        {
            window.history.replaceState(window.history.state, document.title, baseUrl + "?" + queryString);
        }
        else
        {
            window.history.replaceState(window.history.state, document.title, baseUrl);
        }
    };

    return ([ Object.assign({}, cache), set ]);
};

export default useQuery;
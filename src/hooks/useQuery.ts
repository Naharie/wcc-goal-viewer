interface QueryParameters
{
    [key: string]: string;
}

let oldQuery = "";
let cache: QueryParameters = {};

const useQuery = (): [QueryParameters, (value: QueryParameters) => void] =>
{
    if (location.search !== "" && location.search !== oldQuery)
    {
        cache = {};

        const pairs = location.search.substring(1).split("&");

        for (const pair of pairs)
        {
            const [name, value] = pair.split("=");
            cache[decodeURIComponent(name)] = decodeURIComponent(value);
        }
    }

    const set = (query: QueryParameters) =>
    {
        const baseUrl = location.origin + location.pathname + location.hash.split("?")[0];
        const queryString = Object.entries(query).map (([ name, value ]) =>
            encodeURIComponent(name) + "=" + encodeURIComponent(value)
        ).join("&");

        if (queryString !== "")
        {
            history.replaceState(history.state, document.title, baseUrl + "?" + queryString);
        }
        else
        {
            history.replaceState(history.state, document.title, baseUrl);
        }
    };

    return ([ Object.assign({}, cache), set ]);
};

export default useQuery;
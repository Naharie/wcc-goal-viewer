export const getQuery = () =>
{
    if (location.search == null || location.search === "?") return {};

    const parts = location.search.substring(1).split("&");
    const result: Record<string, string> = {};

    for (const part of parts)
    {
        const [name, value] = part.split("=");
        result[decodeURIComponent(name)] = decodeURIComponent(value);
    }

    return result;
};
export const setQuery = (query: Record<string, string>) =>
{
    const search =
        Object.entries(query)
        .filter(([name, ]) => name != "" && name != undefined)
        .map(([name, value]) => encodeURIComponent(name) + "=" + encodeURIComponent(value)).join("&");
    const url = location.toString().split("?")[0] + "?" + search;

    history.pushState(null, "", url);
};

export const setQueryParameter = (parameter: string, value: string) =>
{
    setQuery({
        ...getQuery(),
        [parameter]: value
    });
};
import useQuery from "./useQuery";

const useCanEdit = () =>
{
    const [query] = useQuery();
    return (query.edit === "true" || query.edit === "1");
};

export default useCanEdit;
import useQuery from "../hooks/useQuery";

const isEditMode = () =>
{
    const [query] = useQuery();
    return (query.edit === "true" || query.edit === "1");
};

export default isEditMode;
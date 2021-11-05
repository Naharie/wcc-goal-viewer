export const list = function (...values: (string | undefined | null)[])
{
    return (
        values.filter(value => value !== "" && value !== null && value !== undefined).join(" ")
    );
};
const chooseBackground = (highlighted: boolean, dimmed: boolean) =>
{
    if (dimmed)
    {
        return highlighted ? " bg-dim-selected " : " bg-dim-not-selected ";
    }
    else
    {
        return highlighted ? " bg-selected " : " bg-not-selected ";
    }
};

export default chooseBackground;
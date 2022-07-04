import TextArea from "./TextArea";

interface GoalTextProps
{
    value: string;
    isEditable?: boolean;
}

const GoalText = ({ value, isEditable }: GoalTextProps) =>
{
    if (!isEditable)
    {
        return (<>{value}</>)
    }

    return (<TextArea value={value} />)
};

export default GoalText;
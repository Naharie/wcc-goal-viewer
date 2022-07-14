import TextArea from "./TextArea";

interface GoalTextProps
{
    value: string;
    isEditable?: boolean;
    textChanged?: (value: string) => void;
}

const GoalText = ({ value, isEditable, textChanged }: GoalTextProps) =>
{
    if (!isEditable)
    {
        return (<>{value}</>)
    }

    return (<TextArea value={value} textChanged={textChanged} />)
};

export default GoalText;
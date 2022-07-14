import React, { useState } from "react";

interface TextBoxProps
{
    value?: string;

    validator?: (value: string) => true | string;
    textChanged?: (value: string) => void;
}

const ValidatedTextBox = (props: TextBoxProps) =>
{
    const [text, setText] = useState(props.value ?? "");
    const [error, setError] = useState<string | null>(null);

    const update = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setText(event.target.value);

        const validation = props.validator?.(event.target.value) ?? true;

        if (validation === true)
        {
            props.textChanged?.(event.target.value);
            setError(null);
        }
        else
        {
            setError(validation);
        }
    };

    return (
        <>
            <input type="text"
                value={text}
                className={`
                    focus:outline-none
                    overflow-hidden
                    bg-not-selected default:bg-not-selected
                    px-2 w-full
                    border border-solid border-gray-300
                    ${error != null ?
                        "border-b-transparent rounded-t-md" :
                        "rounded-md"
                    }
                `}
                onChange={update}
            />
            {error != null ?
                <div className={`
                      bg-red-300 px-2
                        border border-solid border-gray-300 border-t-transparent
                        rounded-b-md w-[99.3%] box-border
                    `}>
                    {error}
                </div>
            : null}
        </>
    )
};

export default ValidatedTextBox;
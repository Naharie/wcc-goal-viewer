import React, { FC } from "react";

interface AddButtonProps
{
    onClick?: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick }) =>
    <div className="mb-1-3 text-center font-size-2em cursor-pointer" onClick={onClick}>
        +
    </div>;

export default AddButton;
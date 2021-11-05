import React, { FC } from "react";

interface ScrollWrapperProps
{
    className?: string;
}

const ScrollWrapper: FC<ScrollWrapperProps> = ({ className, children }) =>
    <div className={"w-100 mh-0 h-100 overflow-y-scroll scroll-hover" + (className ? " " + className : "")}>
        {children}
    </div>;

export default ScrollWrapper;
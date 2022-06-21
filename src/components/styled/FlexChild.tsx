import { PropsWithChildren } from "react";
import styled from "styled-components";

const FlexChild = styled.div(({ size = 1}: PropsWithChildren<{ size?: number }>) => `
    flex: ${size} ${size} 0;
    height: 100%;
    border-right: 1px solid gray;
`);

export default FlexChild;
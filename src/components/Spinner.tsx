/**
 * CSS is taken and modified from Bootstrap, which is licensed under MIT.
 * The license will not be included here, as this is not a substantial portion of the codebase.
 * If, however, you wish to read it, the license can be found in its entirety at:
 * https://github.com/twbs/bootstrap/blob/main/LICENSE
 */

import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    display: inline-block;
    width: 4rem;
    height: 4rem;
    vertical-align: text-bottom;
    border: .25em solid #46c768;
    border-right-color: #46c768;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: ${spin} .75s linear infinite;
    animation: ${spin} .75s linear infinite;
`;

export default Spinner;
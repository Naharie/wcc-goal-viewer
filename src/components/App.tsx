import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const App = styled.div`
    text-align: center;
`;

const AppHeader = styled.header`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
`;

const AppLinkBase = styled.a`
    color: rgb(112, 76, 182);
`;

const AppLink = ({ href, children }: PropsWithChildren<{ href: string }>) =>
    <AppLinkBase href={href} target="_blank" rel="noopener noreferrer">{children}</AppLinkBase>;

const AppCode = styled.code`
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
`;

export default () =>
    <App>
      <AppHeader>
        <p>Edit <AppCode>src/App.tsx</AppCode> and save to reload.</p>
        <span>
          <span>Learn </span>
          <AppLink href="https://reactjs.org/">React</AppLink>
          <span>, </span>
          <AppLink href="https://redux.js.org/">Redux</AppLink>
          <span>, </span>
          <AppLink href="https://redux-toolkit.js.org/">Redux Toolkit</AppLink>
          ,<span> and </span>
          <AppLink href="https://react-redux.js.org/">React Redux</AppLink>
        </span>
      </AppHeader>
    </App>;
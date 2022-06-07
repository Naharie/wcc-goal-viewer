import React from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";

import { store } from "./store";

import { Provider } from "react-redux";
import App from "./components/App";

/*
https://github.com/rommguy/react-custom-scroll
https://redux.js.org/usage/deriving-data-selectors
https://github.com/Naharie/wcc-goal-viewer/tree/06507ed1ec527f8e384eb3c358b273c7af595909
https://github.com/Naharie/wcc-goal-viewer/tree/06507ed1ec527f8e384eb3c358b273c7af595909/src
*/

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
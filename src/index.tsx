import React from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";

import { store } from "./redux/store";

import { Provider } from "react-redux";
import App from "./components/App";

/*
https://github.com/rommguy/react-custom-scroll
https://github.com/Naharie/wcc-goal-viewer
https://react-redux.js.org/introduction/getting-started
*/

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
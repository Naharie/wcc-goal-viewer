import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "jotai";

import App from "./components/App";

import "./css/base.css";
import "./css/utilities.css";

const Root: React.FC = () =>
    <Provider>
        <App />
    </Provider>;

ReactDOM.render(<Root />, document.getElementById("root"));
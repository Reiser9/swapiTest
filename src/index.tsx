import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <ConfigProvider theme={{ token: { colorPrimary: "#007cee", fontFamily: 'Montserrat' } }}>
            <Provider store={store}>
                <App />
            </Provider>
        </ConfigProvider>
    </BrowserRouter>
);

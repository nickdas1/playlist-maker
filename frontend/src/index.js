import React from "react";
import ReactDOM from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./components/App";
import reducers from "./reducers";
import history from "./history";

const store = configureStore(
    {
        reducer: reducers,
    },
    applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <HistoryRouter history={history}>
            <App />
        </HistoryRouter>
    </Provider>
);

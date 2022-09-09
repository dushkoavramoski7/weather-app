import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/reducers";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();

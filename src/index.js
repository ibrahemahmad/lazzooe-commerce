import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./controller/redux/store";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <App/>
            </Router>
        </React.StrictMode></Provider>,
    document.getElementById('root')
);


reportWebVitals();

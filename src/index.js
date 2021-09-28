import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store";
import reportWebVitals from './reportWebVitals';

render(
    <Provider store={store}>
        <App/>,
    </Provider>,
    document.getElementById('root')  || document.createElement('div')
);


reportWebVitals();

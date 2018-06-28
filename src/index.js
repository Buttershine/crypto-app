import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import initialState from './store/initialState';
import './App.css';
import cryptoReducers from "./reducers/reducers";



document.addEventListener("DOMContentLoaded", () => {
    let store = createStore(cryptoReducers);
    const rootElement = document.getElementById('root')
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    )
});


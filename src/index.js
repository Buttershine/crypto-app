import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import initialState from './store/initialState';
import './App.css';
import configureStore from "./store/configureStore";

document.addEventListener("DOMContentLoaded", () => {
    let store = configureStore(initialState);
    const rootElement = document.getElementById('root')
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    )
});


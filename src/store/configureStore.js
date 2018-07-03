import { createStore } from 'redux';
import rootReducer from "../reducers/reducers";

//Obtain persisted state:
let localStorageCoinList = JSON.parse(localStorage.getItem('coinList'));

//Order Matters: reducers, state, etc.
const configureStore = (initialState) => (
    createStore(
        rootReducer,
        localStorageCoinList
    )
);

export default configureStore;
import { createStore } from 'redux';
import rootReducer from "../reducers/reducers";

//Obtain persisted state:
let localStorageCoinList = localStorage.getItem('coinList');
if(localStorageCoinList && localStorageCoinList !== "undefined"){
    localStorageCoinList = JSON.parse(localStorage.getItem('coinList'));
} else {
    localStorageCoinList = {};
}

//Order Matters: reducers, state, etc.
const configureStore = (initialState) => (
    createStore(
        rootReducer,
        localStorageCoinList
    )
);

export default configureStore;
import { createStore } from 'redux';
import cryptoReducers from "../reducers/reducers";

const configureStore = () => (
    createStore(
        initialState
    )
);

export default configureStore;
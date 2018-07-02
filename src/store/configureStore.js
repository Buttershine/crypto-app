import { createStore } from 'redux';
import rootReducer from "../reducers/reducers";

//Order Matters: reducers, state, etc.
const configureStore = (initialState) => (
    createStore(
        rootReducer,
        initialState
    )
);

export default configureStore;
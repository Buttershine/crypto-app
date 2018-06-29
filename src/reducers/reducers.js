import { merge } from 'lodash';
import { combineReducers } from 'redux';

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/authActions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false
}, action) {
    console.log(localStorage);
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        default:
            return state
    }
}

// The crypto reducer
function price(state = {}, action) {
    switch (action.type) {
        default:
            return state
    }
}

const SORT_BY_PERCENTAGE = 'SORT_BY_PERCENTAGE';
const SORT_BY_DOLLAR = 'SORT_BY_PERCENTAGE';
const SORT_BY_BTCRATIO = 'SORT_BY_BTC_RATIO';

export const sortByPercentage = () => ({
    type: SORT_BY_PERCENTAGE
});

export const sortByDollarAmount = () => ({
    type: SORT_BY_DOLLAR
});

export const sortByBTCRatio = () => ({
    type: SORT_BY_BTCRATIO
});

export const filterReducer = (getState, action) => {
    let newState = merge({}, getState);

    switch (action.type) {
        case SORT_BY_PERCENTAGE: {
            // dispatch(showLoader());
            const filter = "percentage";
            return merge(newState, filter)
        }
        default: {
            return newState;
        }
    }
};

const UPDATE_ASSET = 'UPDATE_ASSET';

export function updateStoreForAssetRow (asset){
    return { type: UPDATE_ASSET, asset }
};

export const assetReducer = (getState, action) => {
    let newState = merge({}, getState);
    switch (action.type) {
        case UPDATE_ASSET: {
            return merge(newState, action.asset)
        }
        default: {
            return newState
        }
    }
    console.log(getState);
}

export const ADD_TODO = 'ADD_TODO'

export function addTodo(text) {
    return { type: ADD_TODO, text }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        default:
            return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const cryptoReducers = combineReducers({
    filterReducer,
    assetReducer,
    todos
});

export default cryptoReducers;

// const deliveryCalendarReducer = (state = initialState.deliveryCalendar, action) => {
//     let newState = merge({}, state);
//
//     Object.freeze(state);
//     switch (action.type) {
//         case LOAD_DELIVERY_CALENDAR_SUCCESS:
//             return process.env.USE_LIVE === 'true' ?
//                 merge(newState, action.delivery.data.checkoutModel.deliveryModel) :
//                 merge(newState, action.delivery.checkoutModel.deliveryModel);
//
//         default:
//             return state;
//     }
// };
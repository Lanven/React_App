import React  from 'react';

import {createStore} from "redux";
import {Provider} from "react-redux";

import ReactDOM from "react-dom";
import App from "./app";

const reducer = (state, action) => {
    let newState = Object.assign({}, state);
    if (action.type === 'SET_VALUE') {
        newState = Object.assign(newState, { value: action.value.trim() });
    }
    if (action.type === 'SET_NAME') {
        newState = Object.assign(newState, { name: action.value.trim() });
    }


    return newState;
}

const store = createStore(reducer, {value: '', name: 'fdf'},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)

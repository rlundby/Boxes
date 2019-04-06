import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers';

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let boxes = {};

let initialState = {boxes};
export default createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
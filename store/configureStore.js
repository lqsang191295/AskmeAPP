import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import { crashReporter } from '../utils/logger';

// const composeEnhancers = compose;
// const middleware = [thunk];

export default (initState = {}) => createStore(rootReducer, initState, applyMiddleware(thunk));

import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from "redux";
import thunkMiddleware from 'redux-thunk'
import snakeReducer from "./reducers/snakeReducer";



let rootReducer = combineReducers({
    snake: snakeReducer,
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store
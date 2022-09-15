import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { userMiddlewares } from "./userData/userData.middlewares";
import userDataReducer from "./userData/userData.reducer";

const middlewares = applyMiddleware(
    userMiddlewares
)

const reducers = combineReducers({
    userData: userDataReducer
});

const store = createStore(reducers, middlewares
    //  &&

    // // /* Use redux devtools extension. */
    // (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store;
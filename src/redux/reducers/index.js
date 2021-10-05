import { combineReducers } from "redux";
import adminReducer from "./adminReducer"

const reducers = combineReducers({
    adminData: adminReducer
})
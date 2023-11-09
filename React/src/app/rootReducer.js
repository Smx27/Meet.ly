import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../redux/slice/auth/AuthSlice";

const rootReducer = combineReducers({
auth:authReducer,

})
export default rootReducer;
import { all } from "redux-saga/effects";
import authSaga from "../redux/saga/auth/AuthSaga";
export function* rootSaga() {
    yield all([
        authSaga()
    ])}

    export default rootSaga; 
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: {
    },
    isFetching: false
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // login: (state) => {
        //     state.isFetching = true;
        // },
        // // eslint-disable-next-line no-unused-vars
        // refreshLogin: (state,_action)=>{
        //     state.isFetching = true
        // },
        // eslint-disable-next-line no-unused-vars
        registration: (state, _action) => {
            state.isFetching = true;
        },
        authSuccess(state, action) {
           // console.log(action.payload.data)
            state.data = action.payload.data
            state.isFetching = false
        },
        authFailed(state, action) {
            state.message = action.payload
            state.isFetching = false
        },
        reset(state) {
            Object.assign(state, initialState)
        }
    },
});
// Actions
export const authActions = authSlice.actions;
// Reducer
const authReducer = authSlice.reducer;
export { authReducer };
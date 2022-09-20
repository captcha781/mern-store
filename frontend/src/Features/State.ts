import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialStateType, UserType } from "../Interface"


const initialState: InitialStateType = {
    auth: false,
    user: null
}

export const stateSlice = createSlice({
    initialState,
    name: "state",
    reducers: {
        initializeUser: (state:InitialStateType, action:PayloadAction<UserType | null>) => {
            state.user = action.payload
        },
        classifyAuth: (state, action) => {
            state.auth = action.payload
        }

    }
})

export const { initializeUser, classifyAuth } = stateSlice.actions

export default stateSlice.reducer
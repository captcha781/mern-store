import {configureStore} from "@reduxjs/toolkit"
import stateReducer from "../Features/State"

const Store = configureStore({
    reducer: {
        state : stateReducer
    }
})

export default Store
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
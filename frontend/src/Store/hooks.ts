import { RootState,AppDispatch } from "./store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const useAppState:TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { State } from "../data";
import type { AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
import { configureStore } from "@reduxjs/toolkit"
import { ThunkDispatch } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice"

export const store = configureStore({
  reducer: {
    todos: todosSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<any,any,any>
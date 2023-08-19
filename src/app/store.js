import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/slices/todoSlice";
import { loadStateFromLocalStorage } from "../utils/storage";

const preloadedState = loadStateFromLocalStorage();


export const appStore = configureStore({
  // for multiple reducer

  // reducer: {
  //     todo: todoReducer,
  // },

  //   for single reducer
  reducer: todoReducer,
  preloadedState,
});

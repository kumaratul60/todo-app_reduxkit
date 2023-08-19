import { createSlice, nanoid } from "@reduxjs/toolkit";
import todoUtils from "../actions/todoActions";

const initialState = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: todoUtils.addTodo,
    removeTodo: todoUtils.removeTodo,
    updateTodo: todoUtils.updateTodo,
    toggleComplete: todoUtils.toggleComplete,
    updateTodoOrder: todoUtils.updateTodoOrder,
  },
});

export const { addTodo, removeTodo, updateTodo, toggleComplete, updateTodoOrder } =
  todoSlice.actions;
export default todoSlice.reducer;

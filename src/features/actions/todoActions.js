import { nanoid } from "@reduxjs/toolkit";
import { saveStateToLocalStorage } from "../../utils/storage";
// addTodo:(state,action)=>{
//     state.todo.push(action.payload)
// }

const addTodo = (state, action) => {
  const sTodo = {
    id: nanoid(),
    text: action.payload,
    completed: false,
  };
  state.todos.push(sTodo);
  saveStateToLocalStorage(state);
};

const removeTodo = (state, action) => {
  state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  saveStateToLocalStorage(state);
};

const updateTodo = (state, action) => {
  const { id, text } = action.payload;
  const updatedTodoIndex = state.todos.findIndex((todo) => todo.id === id);

  if (updatedTodoIndex !== -1) {
    state.todos[updatedTodoIndex] = {
      ...state.todos[updatedTodoIndex],
      text: text,
    };
  }
  saveStateToLocalStorage(state);
};

// updateTodo: (state, action) => {
//   const updatedTodoIndex = state.todos.findIndex(
//     (todo) => todo.id === action.payload.id
//   );

//   if (updatedTodoIndex !== -1) {
//     state.todos[updatedTodoIndex] = Object.assign(
//       {},
//       state.todos[updatedTodoIndex],
//       {
//         text: action.payload.text,
//       }
//     );
//   }
// },

const toggleComplete = (state, action) => {
  const isTodoComplete = state.todos.find((todo) => todo.id === action.payload);
  if (isTodoComplete) {
    isTodoComplete.completed = !isTodoComplete.completed;
  }
  saveStateToLocalStorage(state);
};

const updateTodoOrder = (state, action) => {
  const newTodoOrder = action.payload;
  state.todos = newTodoOrder.map((todoId) =>
    state.todos.find((todo) => todo.id === todoId)
  );
  saveStateToLocalStorage(state);
};

const todoUtils = {
  addTodo,
  removeTodo,
  updateTodo,
  toggleComplete,
  updateTodoOrder,
};

export default todoUtils;

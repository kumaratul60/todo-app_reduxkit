import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  toggleComplete,
  updateTodo,
} from "../features/slices/todoSlice";

const Todos = () => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const getTodos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  //   console.log({ getTodos });

  const filteredTodos = getTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditButtonClick = (todoId) => {
    if (editingTodoId === todoId) {
      saveEditedTodo(todoId);
    } else {
      activateEditMode(todoId);
    }
  };

  const saveEditedTodo = (todoId) => {
    if (updatedText !== "") {
      dispatch(updateTodo({ id: todoId, text: updatedText }));
    }
    setEditingTodoId(null); // Turn off edit mode
    clearCompletedStatus(todoId); // Clear completion status when entering edit mode
  };

  const activateEditMode = (todoId) => {
    setEditingTodoId(todoId);
    setUpdatedText(getTodoTextById(todoId)); // Initialize the input with current text
  };

  const clearCompletedStatus = (todoId) => {
    const todo = getTodos.find((todo) => todo.id === todoId);
    if (todo && todo.completed) {
      dispatch(toggleComplete(todoId));
    }
  };

  const getTodoTextById = (todoId) => {
    const todo = getTodos.find((todo) => todo.id === todoId);
    return todo ? todo.text : "";
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="font-bold text-xl m-5 mb-4">Todos</div>
      {/* {getTodos.map((todo)=>{
            return <div key={todo.id}>{todo.text}</div>
        })} */}
      <ul className="list-none ">
        {/* getTodos */}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 mx-[25rem] flex justify-between items-center bg-slate-300 p-4 rounded-lg shadow-md "
          >
            <div className="flex">
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  className="rounded p-2  focus:ring-2 focus:ring-yellow-300 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out caret-pink-500"
                />
              ) : (
                <div className={`${todo.completed ? "line-through" : ""}`}>
                  {todo.text}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                // className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ${
                  editingTodoId === todo.id || todo.completed
                    ? "opacity-50"
                    : ""
                }`}
                // onClick={() => {
                //   if (editingTodoId === todo.id) {
                //     // If already editing, dispatch update action
                //     dispatch(updateTodo({ id: todo.id, text: updatedText }));
                //     setEditingTodoId(null); // Turn off edit mode
                //   } else {
                //     // If not editing, activate edit mode
                //     setEditingTodoId(todo.id);
                //     setUpdatedText(todo.text); // Initialize the input with current text
                //   }
                // }}

                onClick={() => handleEditButtonClick(todo.id)}
              >
                {editingTodoId === todo.id ? "Save" : "Update"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                Delete
              </button>

              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ${
                  todo.completed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (!todo.completed) {
                    dispatch(toggleComplete(todo.id));
                  }
                }}
              >
                Complete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/slices/todoSlice";

const AddTodo = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const isValidInput = (value) => {
        // If textarea is empty, or contains only newlines, reject it.
        if (!value || !value.trim()) {
            return false;
        } else {
            return true;
        }
    };

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (!isValidInput(input)) {
            return;
        }
        dispatch(addTodo(input));
        setInput("");
    };

    return (
        <form onSubmit={ addTodoHandler } className="space-x-3 mt-12">
            <input
                type="text"
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-10 leading-8 transition-colors duration-200 ease-in-out"
                value={ input }
                onChange={ (e) => setInput(e.target.value) }
                placeholder="Enter todo..."
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Add Todo
            </button>
        </form>
    );
};

export default AddTodo;

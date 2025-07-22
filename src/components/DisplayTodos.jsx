import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000/todos"; // Your backend base URL

const DisplayTodos = () => {
    const [todos, setTodos] = useState([]);
    const [sort, setSort] = useState("active");
    const [search, setSearch] = useState("");

    // Fetch todos from backend on mount
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${API_URL}/todos`);
            console.log("Fetched todos:", res.data);
            setTodos(res.data);
        } catch (err) {
            console.error("Error fetching todos", err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos(todos.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Error deleting todo", err);
        }
    };

    const completeTodo = async (id) => {
        try {
            const todo = todos.find((t) => t._id === id);
            await axios.put(`${API_URL}/${id}`, {
                ...todo,
                completed: !todo.completed,
            });
            fetchTodos(); // Re-fetch to reflect changes
        } catch (err) {
            console.error("Error completing todo", err);
        }
    };

    const updateTodo = async (updatedTodo) => {
        console.log("Calling Updating todo:", updatedTodo);

        if (!updatedTodo._id) {
            console.error("Missing _id in updatedTodo", updatedTodo);
            return;
        }

        console.debug("url for update", `${API_URL}/${updatedTodo._id}`);

        try {
            await axios.put(`${API_URL}/${updatedTodo._id}`, updatedTodo);
            fetchTodos();
        } catch (err) {
            console.error("Error updating todo", err);
        }
    };

    // Filtering function
    const getFilteredTodos = () => {
        return todos.filter((todo) => {
            const matchesSearch = todo.item
                .toLowerCase()
                .includes(search.toLowerCase());

            if (sort === "active") return !todo.completed && matchesSearch;
            if (sort === "completed") return todo.completed && matchesSearch;
            return matchesSearch;
        });
    };

    const filteredTodos = getFilteredTodos();

    return (
        <div className="displaytodos">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="buttons">
                {["active", "completed", "all"].map((label) => (
                    <motion.button
                        key={label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSort(label)}
                        className={`filter-btn ${sort === label ? "active" : ""}`}
                    >
                        {label[0].toUpperCase() + label.slice(1)}
                    </motion.button>
                ))}
            </div>

            <ul className="todo-list">
                <AnimatePresence>
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            item={todo}
                            removeTodo={() => deleteTodo(todo._id)}
                            updateTodo={updateTodo}
                            completeTodo={() => completeTodo(todo._id)}
                        />
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default DisplayTodos;

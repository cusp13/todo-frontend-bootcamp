import React, { useState } from "react";
import { motion } from 'framer-motion';
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import { addTodos } from "../../redux/reducer";
import axios from "axios";

const Todos = () => {
    const [todo, setTodo] = useState("");
    const dispatch = useDispatch();
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/todos` || "http://localhost:3000/todos";
    console.log("Base URL for adding todos:", baseUrl);
    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const add = async () => {
        if (todo.trim() === "") {
            alert("Input is empty");
            return;
        }

        try {
            const res = await axios.post(baseUrl, {
                item: todo,
                completed: false,
            });

            const savedTodo = res.data;
            dispatch(addTodos(savedTodo));
            setTodo("");
        } catch (err) {
            console.error("Error adding todo:", err);
            alert("Failed to add todo. Try again.");
        }
    };

    return (
        <div className="addTodos">
            <input
                type="text"
                onChange={handleChange}
                value={todo}
                className="todo-input"
                placeholder="Add a new task..."
            />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={add}
                className="add-btn"
            >
                <GoPlus />
            </motion.button>
        </div>
    );
};

export default Todos;

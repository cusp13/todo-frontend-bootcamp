import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// Initial state is an empty array
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
    },
    removeTodos: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload);
    },
    updateTodos: (state, action) => {
      return state.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    setTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodos, removeTodos, updateTodos, setTodos } = todoSlice.actions;

export default todoSlice.reducer;

// // ───────────────────────────────
// // ✅ THUNKS (Async backend calls)
// // ───────────────────────────────

// // 1. Fetch all todos
// export const fetchTodosFromBackend = () => async (dispatch) => {
//   console.log("Fetching todos from backend...");
//   try {
//     const res = await axios.get("http://localhost:3000/todos");
//     dispatch(setTodos(res.data));
//   } catch (err) {
//     console.error("Error fetching todos:", err);
//   }
// };

// // 2. Add a todo
// export const addTodoToBackend = (todo) => async (dispatch) => {
//   try {
//     const res = await axios.post("http://localhost:3000/todos", {
//       item: todo,
//       completed: false,
//     });
//     dispatch(addTodos(res.data)); // response has _id
//   } catch (err) {
//     console.error("Error adding todo:", err);
//   }
// };

// // 3. Delete a todo
// export const deleteTodoFromBackend = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`http://localhost:3000/todos/${id}`);
//     dispatch(removeTodos(id));
//   } catch (err) {
//     console.error("Error deleting todo:", err);
//   }
// };

// // 4. Update a todo
// export const updateTodoInBackend = (todo) => async (dispatch) => {
//   try {
//     const res = await axios.put(`http://localhost:3000/todos/${todo._id}`, {
//       item: todo.item,
//       completed: !todo.completed,
//     });
//     dispatch(updateTodos(res.data));
//   } catch (err) {
//     console.error("Error updating todo:", err);
//   }
// };

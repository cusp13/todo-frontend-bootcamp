import axios from "axios";

const API_URL = import.meta.env.BACKEND_API_URL ||"http://localhost:3000";

export const getTodos = async () => {
  const res = await axios.get(`${API_URL}/todos`);
  return res.data;
};

export const addTodo = async (todoData) => {
  const res = await axios.post(`${API_URL}/todos`, todoData);
  return res.data;
};

export const updateTodo = async (id, updates) => {
  const res = await axios.put(`${API_URL}/todos/${id}`, updates);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_URL}/todos/${id}`);
  return res.data;
};

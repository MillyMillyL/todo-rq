import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL, "base url");

const todosApi = axios.create({ baseURL });

export const getTodos = async () => {
  const res = await todosApi.get("/todos");
  return res.data;
};

export const addTodo = async (newTodo) => {
  return await todosApi.post("/todos", newTodo);
};
export const updateTodo = async (todo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo);
};
export const deleteTodo = async ({ id }) => {
  return await todosApi.delete(`/todos/${id}`, id);
};

export default todosApi;

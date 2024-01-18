import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { addTodos as apiAddTodo } from "../../services/apiTodos";

function AddNewTodo() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation({
    mutationFn: apiAddTodo,
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 mt-2 text-center">
      <label htmlFor="new-todo" className="mr-4">
        Add new todo
      </label>
      <input
        type="text"
        id="new-todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
        className="mr-4 px-2 py-1 rounded-lg"
      />
      <button>
        <FaUpload />
      </button>
    </form>
  );
}

export default AddNewTodo;

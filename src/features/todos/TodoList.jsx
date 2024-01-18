import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import {
  getTodos as apiTodos,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
} from "../../services/apiTodos";

function TodoList() {
  const [onlyShowUncompleted, setOnlyShowUncompleted] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: apiTodos,
    select: (data) => {
      return data.sort((a, b) => b.id - a.id);
    },
  });

  console.log(todos);

  const uncompletedTodos = todos?.filter((todo) => todo.completed === false);
  const numUncompleted = uncompletedTodos?.length;

  const updateTodoMutation = useMutation({
    mutationFn: apiUpdateTodo,
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: apiDeleteTodo,
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <p>
        <span className="text-red-500 font-bold">{numUncompleted}</span>{" "}
        uncompleted tasks
      </p>
      <ul className="list-none mt-2 overflow-auto h-[60vh]">
        {(!onlyShowUncompleted ? todos : uncompletedTodos).map((todo) => (
          <li key={todo.id} className="leading-loose flex gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() => {
                console.log("changed");
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                });
              }}
            />
            <label
              htmlFor={todo.id}
              className={todo.completed ? "line-through" : ""}
            >
              {todo.title}
            </label>
            <button onClick={() => deleteTodoMutation.mutate(todo.id)}>
              <FaRegTrashCan />
            </button>
          </li>
        ))}
      </ul>
      <input
        type="checkbox"
        id="show-uncompleted"
        className="mt-4"
        checked={onlyShowUncompleted}
        onChange={() => setOnlyShowUncompleted((prev) => !prev)}
      />
      <label htmlFor="show-uncompleted" className="ml-2">
        Only show uncompleted tasks
      </label>
    </div>
  );
}

export default TodoList;

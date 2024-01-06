import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, updateTodo, deleteTodo } from "../../api/todosApi";
import { FaRegTrashCan } from "react-icons/fa6";

function TodoList() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryFn: getTodos,
    queryKey: ["todos"],
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <p>
        <span className="text-red-500 font-bold">
          {todos.filter((todo) => todo.completed === false).length}
        </span>{" "}
        uncompleted tasks
      </p>
      <ul className="list-none">
        {todos.map((todo) => (
          <li key={todo.id} className="leading-loose">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                })
              }
            />
            <label
              htmlFor={todo.id}
              className={todo.completed ? "line-through" : ""}
            >
              {todo.title}
            </label>
            <button onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
              <FaRegTrashCan />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

import TodoList from "./features/todos/TodoList";
import AddNewTodo from "./features/todos/AddNewTodo";

function App() {
  return (
    <main className="app">
      <h1 className="text-3xl text-center mb-6">Todo List</h1>
      <AddNewTodo />
      <TodoList />
    </main>
  );
}

export default App;

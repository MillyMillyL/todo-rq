import supabase from "./supabase";

export async function getTodos() {
  const { data, error } = await supabase.from("Todos").select("*");

  if (error) {
    console.error(error);
    throw new Error("Todos could not be loaded");
  }
  return data;
}

export async function addTodos(title) {
  const { error } = await supabase
    .from("Todos")
    .insert({ title: title })
    .select();

  if (error) {
    console.error(error);
    throw new Error("Failed to add todo");
  }
}

export async function deleteTodo(id) {
  const { error } = await supabase.from("Todos").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Failed to delete todo");
  }
}

export async function updateTodo(todo) {
  const { error } = await supabase
    .from("Todos")
    .update({ completed: todo.completed })
    .eq("id", todo.id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Failed to update todo");
  }
}

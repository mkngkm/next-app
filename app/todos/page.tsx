async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return res.json();
}

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.slice(0, 10).map((todo: { id: number; title: string }) => (
          <li key={todo.id}>
            <a href={`/todos/${todo.id}`}>{todo.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

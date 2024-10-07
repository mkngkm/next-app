async function getTodo(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch the Todo');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function TodoDetail({
  params,
}: {
  params: { todo: string };
}) {
  const todo = await getTodo(params.todo);

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h1>Todo Detail</h1>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

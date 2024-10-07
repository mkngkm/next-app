import { Metadata } from 'next';
import { getTodo } from '../../lib/getTodos';

export async function generateMetadata({
  params,
}: {
  params: { todo: string };
}): Promise<Metadata> {
  const todoData = await getTodo(params.todo);

  // Debug logs for todoId and todo data
  console.log('Todo ID:', params.todo);
  console.log('Fetched Todo:', todoData);

  if (!todoData) {
    return {
      title: 'Todo not found',
    };
  }

  return {
    title: `ToDo - ${todoData.title}`,
  };
}

export default async function TodoDetail({
  params,
}: {
  params: { todo: string };
}) {
  const todoData = await getTodo(params.todo); // Fetch specific todo data

  if (!todoData) {
    return <div>Todo not found</div>; // Display when data is not fetched
  }

  return (
    <div>
      <h1>Todo Detail</h1>
      <p>Title: {todoData.title}</p>
      <p>Completed: {todoData.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

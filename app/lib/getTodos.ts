export async function getTodos() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      next: { revalidate: 10 }, // ISR setting
    });

    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }

    const todos = await res.json();
    return todos; // Return the complete todo list
  } catch (error) {
    console.error('Error fetching todos:', error);
    return []; // Return an empty array on error
  }
}

export async function getTodo(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch the Todo');
    }

    const todo = await res.json();
    return todo; // Return specific todo data
  } catch (error) {
    console.error('Error fetching todo:', error);
    return null; // Return null on error
  }
}

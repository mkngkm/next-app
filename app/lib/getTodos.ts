export async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await res.json();
  return todos; // 전체 todo 리스트 반환
}

export async function getTodo(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const todo = await res.json();
  return todo; // 특정 todo 데이터 반환
}

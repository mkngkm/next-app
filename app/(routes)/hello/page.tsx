'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function HelloPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  console.log('id:', id, 'name', name);

  const updateParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', '100');
    params.set('name', 'Kim');
    if (router && pathname) router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h1>Hello</h1>
      <p>ID : {id}</p>
      <p>name : {name}</p>
      <button onClick={updateParams}>update params</button>
    </div>
  );
}

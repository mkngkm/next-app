// app/page.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href='/todos'>Go to Todos</Link>
    </div>
  );
};

export default HomePage;

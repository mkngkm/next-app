import Link from 'next/link';
export default function HomePage() {
  return (
    <div>
      <p>
        Go fetch <Link href='/fetch-data'>fetch Data Page</Link>
      </p>
    </div>
  );
}

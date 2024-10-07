import Link from 'next/link';

export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href='/hello/morning'>Morning</Link>
          </li>
          <li>
            <Link href='/hello/afternoon'>Afternoon</Link>
          </li>
          <li>
            <Link href='/hello/evening'>Evening</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}

import Link from 'next/link';
export default function HomePage() {
  const apiUrl = process.env.LOCAL_API_URL;
  const apikey = process.env.LOCAL_API_KEY;
  return (
    <div>
      <p>API URL : {apiUrl}</p>
      <p>API KEY : {apikey}</p>
    </div>
  );
}

// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // 에러 콘솔 출력
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
        <h2 className='text-4xl font-bold text-red-600 mb-4'>
          Oops! Something went wrong.
        </h2>
        <p className='text-gray-700 mb-6'>
          We're sorry, an unexpected error occurred. Please try again.
        </p>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
      <p className='mt-4 text-gray-500'>
        If the issue persists, please contact support.
      </p>
    </div>
  );
}

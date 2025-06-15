// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold tracking-tight mb-4">
          404
        </h1>
        <p className="text-2xl font-semibold mb-2">Coin Not Found</p>
        <p className="text-gray-400 mb-6">
          The coin you`&apos;`re looking for doesn`&apos;`t exist or has been delisted.
        </p>

        <Link
          href="/"
          className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
        >
          ← Go Back Home
        </Link>
      </div>

      <div className="mt-10 opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M12 11c0 2-3 3-3 3s3 1 3 3m0-6c0 2 3 3 3 3s-3 1-3 3m0-6V9a3 3 0 10-6 0v2a3 3 0 006 0zm0 0V9a3 3 0 016 0v2a3 3 0 01-6 0z"
          />
        </svg>
      </div>
    </div>
  );
}

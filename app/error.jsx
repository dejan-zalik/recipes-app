'use client';
import Link from 'next/link';

const ErrorPage = ({ error }) => {
  return (
    <section className="bg-blue-50 min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">
              Whoopsy, dis code no work...
            </h1>
            <p className="text-gray-500 text-md mb-10">{error.toString()}</p>
            <Link
              href="/recipes"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default ErrorPage;

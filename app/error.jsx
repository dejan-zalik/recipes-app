'use client';
import Link from 'next/link';

const ErrorPage = ({ error }) => {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-4 mb-2">Something went wrong</h1>
          <p className="mb-10">{error.toString()}</p>
          <Link
            href="/communityrecipes"
            className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
          >
            Go Home
          </Link>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default ErrorPage;

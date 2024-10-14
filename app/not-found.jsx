import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h1>
          <p className="mb-10">The page you are looking for does not exist.</p>
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

export default NotFoundPage;

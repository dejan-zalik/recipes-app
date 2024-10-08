import Link from 'next/link';

const HomePage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container m-auto py-6 px-6">
        <div className="flex justify-center gap-40">
          <Link
            href="/"
            className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
          >
            <p>
              <span>Public</span>
            </p>
          </Link>
          <Link
            href="/recipes"
            className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
          >
            <p>
              <span>Private</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

import Link from 'next/link';
const Navbar = () => {
  return (
    <nav>
      <div className="container m-auto pt-6 px-6">
        <div className="navbar">
          <Link href="/" className="btn btn-ghost text-xl">
            whatscookin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

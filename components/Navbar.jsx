'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { AlignJustify } from 'lucide-react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
// import Lottie from 'lottie-react';
// import animation from '@/assets/lottie/arrowright.json';

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <nav>
      <div className="container flex m-auto pt-6 px-6">
        <div className="navbar">
          <Link href="/" className="btn btn-ghost text-xl">
            whatscookin
          </Link>
        </div>
        <div className="navbar justify-end">
          {session ? (
            // <Link
            //   href="/recipes"
            //   className="shadow-md rounded border hover:bg-secondary font-bold py-4 px-6"
            // >
            //   <span>Private</span>
            // </Link>
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <AlignJustify />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/recipes">My recipes</Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Log out</button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {/* <Lottie
                animationData={animation}
                loop={true}
                className="w-12 pr-3"
              /> */}
              {providers &&
                Object.values(providers).map((provider, id) => (
                  <button
                    key={id}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: '/recipes' })
                    }
                    className="btn btn-ghost flex items-center rounded-md px-3 py-2 shadow-md"
                  >
                    <FaGoogle />
                    <span>Login or Register</span>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

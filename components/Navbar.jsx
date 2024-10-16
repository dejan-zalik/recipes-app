'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { FaGoogle } from 'react-icons/fa';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [providers, setProviders] = useState(null);

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

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
          {session && (
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <Image
                  className="h-8 w-8 rounded-full"
                  src={profileImage || profileDefault}
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={handleClick}>
                  <Link href="/communityrecipes">Community recipes</Link>
                </li>
                <li onClick={handleClick}>
                  <Link href="/recipes">My recipes</Link>
                </li>
                <li onClick={handleClick}>
                  <button onClick={() => signOut({ callbackUrl: '/' })}>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
          {!session && (
            <div className="mr-3">
              {providers &&
                Object.values(providers).map((provider, id) => (
                  <button
                    key={id}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: '/communityrecipes' })
                    }
                    className="btn btn-ghost flex items-center rounded-md px-3 py-2 shadow-md"
                  >
                    <FaGoogle />
                    <span>Sign in</span>
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

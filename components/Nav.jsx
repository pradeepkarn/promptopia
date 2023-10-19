"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Nav = () => {
  const {data:session} = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={"/create"} className="black_btn">
                Create Post
              </Link>
              <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>
              <Link className="" href={"/profile"}>
                <Image src={session?.user.image}
                  alt="profile image"
                  width={37}
                  height={37}
                  className="rounded-full"
                  onClick={() => setToggleDropdown(
                    (prev) => !prev)}
                />

              </Link>
            </div>
          ) : (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
            </>
          )
        }
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image src={session?.user.image}
                alt="profile image"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setToggleDropdown(
                  (prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link href={"/profile"} className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link href={"/create-prompt"} className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="black_btn mt-5 w-full"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn mt-5 w-full"
                >
                  Sign In
                </button>
              ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
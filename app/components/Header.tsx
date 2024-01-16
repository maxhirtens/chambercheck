"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";

import AvatarDropDown from "./AvatarDropDown";

function AuthButton() {
  const { data: session } = useSession();
  const userImage = session?.user?.image;
  const userName = session?.user?.name;

  if (session) {
    return <AvatarDropDown userName={userName!} userImage={userImage!} />;
  } else
    return (
      <>
        <Button onClick={() => signIn()} text="Sign In" />
      </>
    );
}

const Header = () => {
  return (
    <div className="relative container mx-auto drop-shadow-2xl">
      {/* // Navbar */}
      <nav>
        {/* Flex Container */}
        <div className="flex xl:flex-row flex-col items-center justify-around">
          {/* Logo */}
          <div className="pt-2">
            <Link href="/">
              <Image
                src="/img/cc-logo-2.jpg"
                alt="main ChamberCheck logo"
                priority
                width={250}
                height={100}
                style={{
                  objectFit: "cover",
                  borderRadius: "50px",
                  width: "auto",
                  height: "auto",
                }}
              ></Image>
            </Link>
          </div>
          {/* Menu Items */}
          <div className="drop-shadow-2xl space-x-6 my-6 text-white font-bold text-xl md:text-3xl">
            <Link className="hover:text-emerald-600" href="/about">
              How it Works
            </Link>
            <Link className="hover:text-emerald-600" href="#search">
              Search Restaurants
            </Link>
            <Link className="hover:text-emerald-600" href="/reviews/new">
              Leave a Review
            </Link>
          </div>
          {/* Button */}
          <AuthButton />
        </div>
      </nav>
    </div>
  );
};
export default Header;

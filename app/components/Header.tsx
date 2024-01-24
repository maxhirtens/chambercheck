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
  const userId = session?.user?.id;

  if (session) {
    return (
      <AvatarDropDown
        userName={userName!}
        userImage={userImage!}
        userId={userId!}
      />
    );
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
        <div className="flex flex-row items-center justify-around">
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
          {/* Button */}
          <div className="mt-2">
            <AuthButton />
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;

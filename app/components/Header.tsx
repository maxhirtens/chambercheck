"use client";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";
import AvatarDropDown from "./AvatarDropDown";
import Subtitle from "./Subtitle";
import { Divider } from "@mui/material";
import MainLogo from "./MainLogo";

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
      // <AccountMenu />
    );
  } else
    return (
      <>
        <Button onClick={() => signIn()} text="avatar" />
      </>
    );
}

const Header = () => {
  return (
    <div className="relative container mx-auto drop-shadow-2xl">
      {/* // Navbar */}
      <nav className="pb-6">
        {/* Flex Container */}
        <div className="flex flex-row items-center justify-around">
          <MainLogo />
          {/* Button */}
          <div className="mt-2">
            <AuthButton />
          </div>
        </div>
        <Subtitle text="Real Restaurant Restroom Reviews" />
      </nav>
      <Divider />
    </div>
  );
};
export default Header;

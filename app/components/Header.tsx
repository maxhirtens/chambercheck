import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    // Navbar
    <nav className="relative container mx-auto">
      {/* Flex Container */}
      <div className="flex md:flex-row flex-col items-center justify-around">
        {/* Logo */}
        <div className="pt-2">
          <Link href="/">
            <Image
              src="/img/cc-logo-2.jpg"
              alt="main ChamberCheck logo"
              priority
              width={325}
              height={125}
              style={{
                objectFit: "cover",
                borderRadius: "100px",
                width: "auto",
                height: "auto",
              }}
            ></Image>
          </Link>
        </div>
        {/* Menu Items */}
        <div className="space-x-6 my-6 text-gray-500 text-xl">
          <Link className="hover:text-darkGrayishBlue" href="/about">
            About
          </Link>
          <Link className="hover:text-darkGrayishBlue" href="/users">
            Users
          </Link>
          <Link className="hover:text-darkGrayishBlue" href="/reviews">
            Reviews
          </Link>
        </div>
        {/* Button */}
        <a
          href="/"
          className="p-3 px-6 text-white bg-darkBlue rounded-full baseline text-xl hover:bg-darkGrayishBlue"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
};
export default Header;

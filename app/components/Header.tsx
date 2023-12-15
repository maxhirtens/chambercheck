import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    // Navbar
    <nav className="relative container mx-auto p-12">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
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
        <div className="hidden space-x-6 md:flex text-cyan-800 text-lg">
          <Link className="hover:text-darkGrayishBlue" href="/about">
            About
          </Link>
          <Link className="hover:text-darkGrayishBlue" href="/users">
            Users
          </Link>
        </div>
        {/* Button */}
        <a
          href="/sign-in"
          className="hidden p-3 px-6 pt-2 text-white bg-darkBlue rounded-full baseline hover:bg-darkGrayishBlue md:block"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
};
export default Header;

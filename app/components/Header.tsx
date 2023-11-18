import Link from "next/link";

const Header = () => {
  return (
    // Navbar
    <nav className="relative container mx-auto p-12">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="pt-2">
          <Link href="/">ChamberCheck Logo Dark</Link>
        </div>
        {/* Menu Items */}
        <div className="hidden space-x-6 md:flex">
          <Link className="hover:text-darkGrayishBlue" href="/about">
            About
          </Link>
          <Link className="hover:text-darkGrayishBlue" href="/sign-in">
            Sign In
          </Link>
          <Link className="hover:text-darkGrayishBlue" href="/sign-up">
            Sign Up
          </Link>
        </div>
        {/* Button */}
        <a
          href="#"
          className="hidden p-3 px-6 pt-2 text-white bg-darkBlue rounded-full baseline hover:bg-brightRedLight md:block"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
};
export default Header;

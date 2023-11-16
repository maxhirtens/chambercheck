import Link from "next/link";

const Header = () => {
  return (
    // Navbar
    <nav className="relative container mx-auto p-12">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="pt-2">
          <Link href="/">ChamberCheck Logo</Link>
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
          className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
        >
          Get Started
        </a>

        {/* Button Icon */}
        <button
          id="menu-btn"
          className="block hamburger md:hidden focus:outline-none"
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          id="menu"
          className="absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
        >
          <a href="#">Pricing</a>
          <a href="#">Product</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Community</a>
        </div>
      </div>
    </nav>
  );
};
export default Header;

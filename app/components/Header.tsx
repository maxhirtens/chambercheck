import Link from "next/link";
import Image from "next/image";

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
          <div className="drop-shadow-2xl space-x-6 my-6 text-white font-bold text-xl md:text-3xl">
            <Link className="hover:text-emerald-600" href="/about">
              How it Works
            </Link>
            <Link className="hover:text-emerald-600" href="/reviews/search">
              Search Reviews
            </Link>
            <Link className="hover:text-emerald-600" href="/reviews/new">
              Leave a Review
            </Link>
          </div>
          {/* Button */}
          <a
            href="/"
            className="p-3 px-6 text-white bg-emerald-600 rounded-full font-bold baseline text-xl hover:bg-sky-700"
          >
            Sign In
          </a>
        </div>
      </nav>
    </div>
  );
};
export default Header;

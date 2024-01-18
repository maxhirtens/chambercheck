import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-auto">
      <footer className="footer absolute bottom-0 w-full">
        {/* <!-- Flex Container --> */}
        <div className="container flex flex-col-reverse justify-around px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          {/* <!-- Logo and social links container --> */}
          <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
            <div className="mx-auto my-6 text-center text-white md:hidden">
              Copyright &copy; 2024, All Rights Reserved
            </div>
            {/* <!-- Logo --> */}
            <div className="flex flex-col space-y-3 m-6 text-white">
              <Link href="/">
                <Image
                  src="/img/cc-logo-2.jpg"
                  alt="main ChamberCheck logo"
                  width={175}
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
            {/* <!-- Social Links Container --> */}
            <div className="flex justify-center ml-8 space-x-4">
              {/* <!-- Link 2 --> */}
              <Link href="#">
                <Image
                  className="w-auto"
                  src="/img/icon-youtube.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
              {/* <!-- Link 4 --> */}
              <Link href="#">
                <Image
                  className="w-auto"
                  src="/img/icon-pinterest.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
              {/* <!-- Link 5 --> */}
              <Link href="#">
                <Image
                  className="w-auto"
                  src="/img/icon-instagram.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
          {/* <!-- List Container --> */}
          <div className="flex justify-around space-x-32">
            <div className="flex flex-col space-y-3 text-white">
              <Link href="#" className="hover:text-brightRed">
                Home
              </Link>
              <Link href="#" className="hover:text-brightRed">
                Pricing
              </Link>
              <Link href="#" className="hover:text-brightRed">
                Products
              </Link>
              <Link href="#" className="hover:text-brightRed">
                About
              </Link>
            </div>
            <div className="flex flex-col space-y-3 text-white">
              <Link href="#" className="hover:text-brightRed">
                Careers
              </Link>
              <Link href="#" className="hover:text-brightRed">
                Community
              </Link>
              <Link href="#" className="hover:text-brightRed">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* <!-- Input Container --> */}
          <div className="flex flex-col justify-between">
            <form>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="mailing-list"
                  className="flex-1 px-4 rounded-full focus:outline-none"
                  placeholder="Join Our Mailing List"
                />
                <button className="px-6 py-2 text-white rounded-full bg-brightRed hover:bg-brightRedLight focus:outline-none">
                  Go
                </button>
              </div>
            </form>
            <div className="hidden text-white md:block">
              Copyright &copy; 2024, All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

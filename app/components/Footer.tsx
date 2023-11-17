import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-veryDarkBlue">
      {/* <!-- Flex Container --> */}
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        {/* <!-- Logo and social links container --> */}
        <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright &copy; 2023, All Rights Reserved
          </div>
          {/* <!-- Logo --> */}
          <div>
            <p>ChamberCheck Logo</p>
          </div>
          {/* <!-- Social Links Container --> */}
          <div className="flex justify-center space-x-4">
            {/* <!-- Link 1 --> */}
            <a href="#">
              <Image
                src="img/icon-facebook.svg"
                alt=""
                width={30}
                height={30}
              />
            </a>
            {/* <!-- Link 2 --> */}
            <a href="#">
              <Image src="img/icon-youtube.svg" alt="" width={30} height={30} />
            </a>
            {/* <!-- Link 3 --> */}
            <a href="#">
              <Image src="img/icon-twitter.svg" alt="" width={30} height={30} />
            </a>
            {/* <!-- Link 4 --> */}
            <a href="#">
              <Image
                src="img/icon-pinterest.svg"
                alt=""
                width={30}
                height={30}
              />
            </a>
            {/* <!-- Link 5 --> */}
            <a href="#">
              <Image
                src="img/icon-instagram.svg"
                alt=""
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>
        {/* <!-- List Container --> */}
        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3 text-white">
            <a href="#" className="hover:text-brightRed">
              Home
            </a>
            <a href="#" className="hover:text-brightRed">
              Pricing
            </a>
            <a href="#" className="hover:text-brightRed">
              Products
            </a>
            <a href="#" className="hover:text-brightRed">
              About
            </a>
          </div>
          <div className="flex flex-col space-y-3 text-white">
            <a href="#" className="hover:text-brightRed">
              Careers
            </a>
            <a href="#" className="hover:text-brightRed">
              Community
            </a>
            <a href="#" className="hover:text-brightRed">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* <!-- Input Container --> */}
        <div className="flex flex-col justify-between">
          <form>
            <div className="flex space-x-3">
              <input
                type="text"
                className="flex-1 px-4 rounded-full focus:outline-none"
                placeholder="Join Our Mailing List"
              />
              <button className="px-6 py-2 text-white rounded-full bg-brightRed hover:bg-brightRedLight focus:outline-none">
                Go
              </button>
            </div>
          </form>
          <div className="hidden text-white md:block">
            Copyright &copy; 2023, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

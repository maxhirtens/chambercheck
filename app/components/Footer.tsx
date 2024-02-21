import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="">
      <footer className="footer absolute bottom-0 w-full">
        {/* <!-- Flex Container --> */}
        <div className="container flex flex-col-reverse justify-around px-6 py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          {/* <!-- Logo and social links container --> */}
          <div className="flex flex-col-reverse items-center justify-between space-y-12 lg:flex-col lg:space-y-0 lg:items-start">
            <div className="mx-auto my-6 text-center text-white lg:hidden">
              Copyright &copy; 2024, All Rights Reserved.
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
          </div>
          <div className="flex flex-col pt-8 items-center">
            <div className="hidden text-white lg:block">
              Copyright &copy; 2024, All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="absolute text-center bottom-0 mt-36 w-full">
        <div className="flex flex-row justify-center mb-4 space-x-8 text-xl">
          <Link href="/">
            <div className="text-white">Home</div>
          </Link>
          <Link href="/about">
            <div className="text-white">About</div>
          </Link>
          <Link href="/how-it-works">
            <div className="text-white">How It Works</div>
          </Link>
        </div>
        <div className="flex justify-center mb-4">
          <a href="https://www.buymeacoffee.com/maxhirtens">
            <img
              alt="donation link"
              src="https://img.buymeacoffee.com/button-api/?text=Buy Me A Coffee&emoji=☕&slug=maxhirtens&button_colour=ff881a&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
            />
          </a>
        </div>
        <div className="text-white pb-6">
          ChamberCheck Copyright &copy; 2024.
        </div>
      </footer>
    </div>
  );
};

export default Footer;

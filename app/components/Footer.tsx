import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="absolute text-center bottom-0 mt-36 w-full">
        <div className="flex flex-row justify-center mb-6 space-x-8 text-xl">
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
        <div className="text-white pb-6">
          ChamberCheck Copyright &copy; 2024.
        </div>
      </footer>
    </div>
  );
};

export default Footer;

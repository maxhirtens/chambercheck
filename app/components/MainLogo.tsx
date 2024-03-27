import Link from "next/link";
import { Monofett } from "next/font/google";
import { Covered_By_Your_Grace } from "next/font/google";

const font1 = Monofett({ subsets: ["latin"], weight: ["400"] });
const font2 = Covered_By_Your_Grace({ subsets: ["latin"], weight: ["400"] });

const MainLogo = () => {
  return (
    <>
      <div>
        <Link
          className={`${font1.className} mt-1 text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r to-teal-400 from-teal-800`}
          href="/"
        >
          ChamberCheck
        </Link>
        <div
          className={`${font2.className} float-right mt-4 text-orange-400 text-3xl md:text-5xl `}
        >
          SF
        </div>
      </div>
    </>
  );
};

export default MainLogo;

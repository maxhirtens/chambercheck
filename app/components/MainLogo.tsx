import Link from "next/link";
import { Monofett } from "next/font/google";

const font = Monofett({ subsets: ["latin"], weight: ["400"] });

// type MainLogoProps = {
//   color1: string;
//   color2: string;
// };

const MainLogo = () => {
  return (
    <div
      className={`${font.className} mt-1 text-5xl text-transparent bg-clip-text bg-gradient-to-r to-teal-400 from-teal-800`}
    >
      <Link href="/">ChamberCheck</Link>
    </div>
  );
};

export default MainLogo;

import { Silkscreen } from "next/font/google";

const font = Silkscreen({ subsets: ["latin"], weight: ["400"] });

const SmallTitle = (props: { text: string }) => {
  return (
    <div className="mt-8 mx-12">
      <h1
        className={`${font.className} font-bold text-center text-3xl lg:text-4xl`}
      >
        <span className="text-orange-400">{props.text}</span>
      </h1>
    </div>
  );
};

export default SmallTitle;

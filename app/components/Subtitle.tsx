import { Silkscreen } from "next/font/google";

const font = Silkscreen({ subsets: ["latin"], weight: ["400"] });

const Subtitle = (props: { text: string }) => {
  return (
    <div className="mt-8 mx-12">
      <h1
        className={`${font.className} text-slate-400 text-center text-3xl lg:text-4xl`}
      >
        <span className="">{props.text}</span>
      </h1>
    </div>
  );
};

export default Subtitle;

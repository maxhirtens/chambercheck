import React from "react";

const Subtitle = (props: { text: string }) => {
  return (
    <div className="mt-8 mx-12">
      <h1 className="text-5xl font-extrabold text-center md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-700">
          {props.text}
        </span>
      </h1>
    </div>
  );
};

export default Subtitle;

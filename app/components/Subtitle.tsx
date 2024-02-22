import React from "react";

const Subtitle = (props: { text: string }) => {
  return (
    <div className="mt-8 mx-12">
      <h1 className="font-extrabold text-center text-4xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-l to-teal-600 from-indigo-800">
          {props.text}
        </span>
      </h1>
    </div>
  );
};

export default Subtitle;

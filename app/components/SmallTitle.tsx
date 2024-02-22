import React from "react";

const SmallTitle = (props: { text: string }) => {
  return (
    <div className="mt-8 mx-12">
      <h1 className="font-bold text-center text-3xl lg:text-4xl">
        <span className="text-teal-600">{props.text}</span>
      </h1>
    </div>
  );
};

export default SmallTitle;

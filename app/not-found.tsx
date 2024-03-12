import React from "react";
import Link from "next/link";

const notFound = () => {
  return (
    <>
      <div className="flex flex-col items-center relative container mx-auto p-12">
        <p className="text-xl my-6">You weren&apos;t supposed to do that.</p>
        <Link href="/">
          <div className="p-3 px-6 mr-2 text-white bg-teal-500 rounded-full baseline text-xl hover:bg-blue-800">
            Go Home
          </div>
        </Link>
      </div>
    </>
  );
};

export default notFound;

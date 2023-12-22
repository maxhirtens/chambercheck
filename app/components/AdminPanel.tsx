import React from "react";
import Link from "next/link";

const AdminPanel = () => {
  return (
    <div className="bg-emerald-400 drop-shadow-2xl w-64 flex flex-col mx-auto items-center space-y-12 p-12 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-veryDarkBlue">
        Admin Panel
      </h2>
      <div className="flex-row space-x-8">
        <Link
          className="hover:text-darkGrayishBlue hover:underline"
          href="/users"
        >
          Users
        </Link>
        <Link
          className="hover:text-darkGrayishBlue hover:underline"
          href="/reviews"
        >
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

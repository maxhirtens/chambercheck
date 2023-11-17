"use client";
import { useState } from "react";
import Link from "next/link";
import LoadingPage from "./loading";
import Card from "./components/Card";

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-12 p-12">
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};
export default HomePage;

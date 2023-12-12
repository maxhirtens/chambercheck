"use client";
import { useEffect, useState } from "react";
import LoadingPage from "./loading";
import ReviewsBox from "./components/ReviewsBox";
import MapBox from "./components/MapBox";

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <span className="flex flex-col lg:flex-row justify-between p-12">
        <MapBox />
        <ReviewsBox />
      </span>
    </>
  );
};

export default HomePage;

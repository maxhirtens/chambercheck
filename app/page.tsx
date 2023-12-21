"use client";
import { useState } from "react";
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
      <div className="relative container mx-auto p-12">
        <MapBox />
        <ReviewsBox />
      </div>
    </>
  );
};

export default HomePage;

"use client";
import { useState } from "react";
import LoadingPage from "./loading";
import ReviewsBox from "./components/ReviewsBox";
import MapBox from "./components/MapBox";
import AdminPanel from "./components/AdminPanel";

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
        <AdminPanel />
      </div>
    </>
  );
};

export default HomePage;

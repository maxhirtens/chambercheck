"use client";
import { useState } from "react";
import Link from "next/link";
import LoadingPage from "./loading";
import ReviewCard from "./components/ReviewCard";

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-12 p-12">
        <h2 className="text-2xl font-bold text-center text-veryDarkBlue">
          Latest Reviews
        </h2>
        <ReviewCard
          restaurant="Molly's Diner"
          city="San Diego, CA"
          review="The bathroom was so clean! No line and nice decor."
          userImage="/img/avatar-ali.png"
        />
        <ReviewCard
          restaurant="Old Town Cafe"
          city="San Francisco, CA"
          review="No toilet paper. Unbelievable."
          userImage="/img/avatar-richard.png"
        />
        <ReviewCard
          restaurant="Falafel King"
          city="Chicago, IL"
          review="Super appreciate the baby-changing station."
          userImage="/img/avatar-anisha.png"
        />
      </div>
    </>
  );
};

export default HomePage;

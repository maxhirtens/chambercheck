"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Subtitle from "./Subtitle";

const Review: React.FC = () => {
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { rating, reviewText };
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/reviews");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <Subtitle text="New Review" />
          <input
            autoFocus
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            type="text"
            value={rating}
          />
          <textarea
            cols={50}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Review Text"
            rows={8}
            value={reviewText}
          />
          <button
            disabled={!rating || !reviewText}
            type="submit"
            className="p-3 px-6 mr-2 text-white bg-darkBlue rounded-full baseline text-xl hover:bg-blue-800"
          >
            Create
          </button>
          <a
            className="p-3 px-6 mr-2 text-white bg-red-400 rounded-full baseline text-xl hover:bg-red-500"
            href="/"
          >
            Cancel
          </a>
        </form>
      </div>
    </>
  );
};

export default Review;

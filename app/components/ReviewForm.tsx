"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Subtitle from "./Subtitle";
import { StarIcon } from "./StarIcon";

// pass in locationName and locationCity as props to review.

const Review: React.FC<{
  locationName: string;
  locationCity: string;
}> = ({ locationName, locationCity }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { rating, content };
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
        <form className="flex flex-col" onSubmit={submitData}>
          <Subtitle text="New Review" />
          <input
            disabled
            placeholder="Restaurant Name"
            type="text"
            value={locationName ?? "Restaurant Name"}
          />
          <input
            disabled
            placeholder="City"
            type="text"
            value={locationCity ?? "City"}
          />
          {/*  help from https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}
          <div className="cursor-pointer">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  onDoubleClick={() => {
                    setRating(0);
                    setHover(0);
                  }}
                >
                  <span className="star">
                    <StarIcon />
                  </span>
                </button>
              );
            })}
            {rating} stars!
          </div>
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your brief review here!"
            rows={8}
            value={content}
          />
          <button
            disabled={!rating || !content}
            type="submit"
            className="p-3 px-6 mr-2 w-36 text-white bg-darkBlue rounded-full baseline text-xl hover:bg-blue-800"
          >
            Create
          </button>
          <a
            className="p-3 px-6 mr-2 w-36 text-white bg-red-400 rounded-full baseline text-xl hover:bg-red-500"
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

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Subtitle from "./Subtitle";
import { StarIcon } from "./StarIcon";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// pass in locationName and locationCity as props to review.

const Review: React.FC<{
  authorName: string;
  authorEmail: string;
  locationName: string;
  locationCity: string;
}> = ({ authorName, authorEmail, locationName, locationCity }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const [accessible, setAccessible] = useState(false);
  const [genderNeutral, setGenderNeutral] = useState(false);
  const [changingTable, setChangingTable] = useState(false);
  const router = useRouter();

  const starText = () => {
    switch (hover) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "Set a Rating";
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        authorName,
        authorEmail,
        locationName,
        locationCity,
        rating,
        content,
        accessible,
        genderNeutral,
        changingTable,
      };
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-12 max-w-[800px]">
        <form className="flex flex-col space-y-6" onSubmit={submitData}>
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
          <div>Review by: {authorName}</div>
          {/*  help from https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}
          <div className="cursor-pointer text-center">
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
            <div>{starText()}</div>
          </div>
          <textarea
            cols={50}
            maxLength={249}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a brief review here!"
            rows={8}
            required
            value={content}
          />
          <span>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Accessible"
                onChange={() => setAccessible(!accessible)}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Gender Neutral Option"
                onChange={() => setGenderNeutral(!genderNeutral)}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Changing Table"
                onChange={() => setChangingTable(!changingTable)}
              />
            </FormGroup>
            <ul>
              State Tests
              <li>Location Name: {locationName}</li>
              <li>Location City: {locationCity}</li>
              <li>Author: {authorName}</li>
              <li>Author Email: {authorEmail}</li>
              <li>Rating: {rating}</li>
              <li>Content: {content}</li>
              <li>Accessible: {accessible.toString()}</li>
              <li>Gender Neutral: {genderNeutral.toString()}</li>
              <li>Changing Table: {changingTable.toString()}</li>
            </ul>
          </span>
          <span>
            <button
              disabled={!rating || !content}
              type="submit"
              className="p-3 px-6 mr-2 w-36 text-white bg-darkBlue rounded-full baseline text-xl hover:bg-blue-800"
            >
              Submit
            </button>

            <a
              className="button p-4 px-10 mr-2 w-36 text-white bg-red-400 rounded-full baseline text-xl hover:bg-red-500"
              href="/"
            >
              Cancel
            </a>
          </span>
        </form>
      </div>
    </>
  );
};

export default Review;

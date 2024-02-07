"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Subtitle from "./Subtitle";
import { StarIcon } from "./StarIcon";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RestaurantCard from "./RestaurantCard";

const Review: React.FC<{
  authorName: string;
  authorEmail: string;
  locationName: string;
  locationAddress: string;
  placeId: string;
}> = ({ authorName, authorEmail, locationName, locationAddress, placeId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  const [accessible, setAccessible] = useState(false);
  const [genderNeutral, setGenderNeutral] = useState(false);
  const [changingTable, setChangingTable] = useState(false);
  const [clothTowels, setClothTowels] = useState(false);
  const [femProducts, setFemProducts] = useState(false);
  const [handDryer, setHandDryer] = useState(false);
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
        return "Your Rating";
    }
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        authorName,
        authorEmail,
        locationName,
        locationAddress,
        placeId,
        rating,
        content,
        accessible,
        genderNeutral,
        changingTable,
        clothTowels,
        femProducts,
        handDryer,
      };
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/#reviews");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-8 max-w-[800px]">
        <form className="flex flex-col space-y-6" onSubmit={submitData}>
          <Subtitle text="New Review" />
          <RestaurantCard restaurant={locationName} address={locationAddress} />
          {/*  Star Ratings -- help from https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}
          <div className="cursor-pointer text-center drop-shadow-md">
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
            maxLength={240}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a brief review here!"
            rows={8}
            required
            value={content}
            className="rounded-xl p-5"
          />
          {/* Characters Remaining Div */}
          <div className="ml-auto">
            <span className="text-indigo-800">{240 - content.length}</span>{" "}
            Characters Remaining
          </div>
          <span className="flex flex-col md:flex-row justify-evenly">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Accessible for Wheelchair Users"
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
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Cloth Hand Towels"
                onChange={() => setClothTowels(!clothTowels)}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Feminine Hygiene Products"
                onChange={() => setFemProducts(!femProducts)}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Hot Air Hand Dryer"
                onChange={() => setHandDryer(!handDryer)}
              />
            </FormGroup>
          </span>
          <div className="">
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
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;

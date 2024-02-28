"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SmallTitle from "./SmallTitle";
import { StarIcon } from "./StarIcon";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RestaurantCard from "./RestaurantCard";

type ReviewProps = {
  authorName: string;
  authorEmail: string;
  locationName: string;
  locationAddress: string;
  placeId: string;
};

const Review: React.FC<ReviewProps> = ({
  authorName,
  authorEmail,
  locationName,
  locationAddress,
  placeId,
}) => {
  const router = useRouter();
  // state for star ratings.
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  // state for form data.
  const [form, setForm] = useState({
    content: "",
    accessible: false,
    genderNeutral: false,
    changingTable: false,
    clothTowels: false,
    handDryer: false,
  });

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
    if (!rating) return alert("Please leave a star rating!");
    try {
      const body = {
        authorName,
        authorEmail,
        locationName,
        locationAddress,
        placeId,
        rating,
        ...form,
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
      <div className="container mx-auto p-8 max-w-[800px]">
        <form className="flex flex-col space-y-6" onSubmit={submitData}>
          <SmallTitle text="New Review" />
          <RestaurantCard
            restaurant={locationName}
            address={locationAddress}
            placeId={placeId}
          />
          {/*  Star Ratings -- help from https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}
          <div className={`cursor-pointer text-center drop-shadow-md`}>
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
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Type a brief review here!"
            rows={8}
            required
            value={form.content}
            className="rounded-xl p-5"
          />
          {/* Characters Remaining Div */}
          <div className="ml-auto relative bottom-14 right-4">
            <span className="text-indigo-800">{240 - form.content.length}</span>{" "}
            Characters Remaining
          </div>
          <span className="flex flex-col md:flex-row justify-evenly min-w-md bg-slate-100 rounded-xl drop-shadow-md overflow-hidden p-8">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Accessible to Wheelchairs"
                onChange={() =>
                  setForm({ ...form, accessible: !form.accessible })
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Gender Neutral Option"
                onChange={() =>
                  setForm({ ...form, genderNeutral: !form.genderNeutral })
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Changing Table"
                onChange={() =>
                  setForm({ ...form, changingTable: !form.changingTable })
                }
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Cloth Hand Towels"
                onChange={() =>
                  setForm({ ...form, clothTowels: !form.clothTowels })
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Hot Air Hand Dryer"
                onChange={() =>
                  setForm({ ...form, handDryer: !form.handDryer })
                }
              />
            </FormGroup>
          </span>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="p-3 px-6 mr-2 w-36 text-white bg-teal-500 rounded-lg baseline text-xl hover:bg-teal-800"
            >
              Submit
            </button>
            <a
              className="button p-4 px-10 mr-2 w-36 text-white bg-brightRed hover:bg-brightRedLight rounded-lg baseline text-xl"
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

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SmallTitle from "./SmallTitle";
import { StarIcon } from "./StarIcon";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RestaurantCard from "./RestaurantCard";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import { BathroomType } from "@prisma/client";

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
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  // state for bathroom type.
  const [type, setType] = useState<BathroomType>(BathroomType.SHARED);
  // state for form data.
  const [form, setForm] = useState({
    content: "",
    accessible: false,
    genderNeutral: false,
    changingTable: false,
    clothTowels: false,
    handDryer: false,
    notClean: false,
  });
  // prevent duplicate submissions.
  const [isDisabled, setIsDisabled] = useState(false);

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as BathroomType);
  };

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
    setIsDisabled(true);
    if (!rating) return alert("Please leave a star rating!");
    if (matcher.hasMatch(form.content)) {
      alert("Looks like the review contains profanities. Please remove.");
      return;
    }
    try {
      const body = {
        authorName,
        authorEmail,
        locationName,
        locationAddress,
        placeId,
        rating,
        type,
        ...form,
      };
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push(`/places/${placeId}`);
      router.refresh();
    } catch (error) {
      setIsDisabled(false);
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
          <div className="ml-auto text-sm text-slate-400 relative bottom-14 right-2">
            <span className="text-teal-500">{240 - form.content.length}</span>{" "}
            Characters Remaining
          </div>
          {/* Bathroom Type Select */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Restroom Type</InputLabel>
            <Select
              labelId="restroom-type-label"
              required
              id="restroom-type-select"
              value={type}
              label="Restroom Type"
              onChange={handleChange}
              className="rounded-xl bg-slate-100"
            >
              <MenuItem value={BathroomType.SHARED}>Shared</MenuItem>
              <MenuItem value={BathroomType.MENS}>Men&apos;s</MenuItem>
              <MenuItem value={BathroomType.WOMENS}>Women&apos;s</MenuItem>
              <MenuItem value={BathroomType.FAMILY}>Family</MenuItem>
            </Select>
          </FormControl>
          {/* Amenities Checkboxes */}
          <span className="flex flex-col md:flex-row justify-evenly min-w-md bg-slate-100 rounded-xl drop-shadow-md overflow-hidden p-6">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                className="mb-4"
                label="Accessible to Wheelchairs"
                onChange={() =>
                  setForm({ ...form, accessible: !form.accessible })
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                className="mb-4"
                label="Gender Neutral Option"
                onChange={() =>
                  setForm({ ...form, genderNeutral: !form.genderNeutral })
                }
              />

              <FormControlLabel
                control={<Checkbox />}
                className="mb-4"
                label="Changing Table"
                onChange={() =>
                  setForm({ ...form, changingTable: !form.changingTable })
                }
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                className="mb-4"
                label="Cloth Hand Towels"
                onChange={() =>
                  setForm({ ...form, clothTowels: !form.clothTowels })
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                className="mb-4"
                label="Hot Air Hand Dryer"
                onChange={() =>
                  setForm({ ...form, handDryer: !form.handDryer })
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                className="bg-red-100 pr-4 rounded-xl"
                label="Unsanitary or Needs Repairs"
                onChange={() => setForm({ ...form, notClean: !form.notClean })}
              />
            </FormGroup>
          </span>
          <div className="flex flex-row justify-center">
            <button
              type="reset"
              className="p-3 px-6 mr-2 w-36 text-white bg-red-600 hover:bg-red-400 rounded-lg baseline text-xl"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
            <button
              disabled={isDisabled}
              type="submit"
              className={`p-3 px-6 mr-2 w-36 text-white ${
                isDisabled ? "bg-slate-400" : "bg-teal-500 hover:bg-teal-800"
              } rounded-lg baseline text-xl`}
            >
              {isDisabled ? <i>Submitting</i> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;

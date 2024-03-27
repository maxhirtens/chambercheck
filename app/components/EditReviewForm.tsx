"use client";
import React, { useEffect, useState } from "react";
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

export type ReviewProps = {
  formData: {
    id: string;
    locationName: string;
    locationAddress: string;
    authorId: string;
    placeId: string;
    type: BathroomType;
    rating: number;
    content: string;
    accessible: boolean;
    changingTable: boolean;
    genderNeutral: boolean;
    clothTowels: boolean;
    handDryer: boolean;
    notClean: boolean;
  };
};

const EditReviewForm: React.FC<ReviewProps> = ({ formData }) => {
  const router = useRouter();
  // states for star rating.
  const [rating, setRating] = useState<number>(formData.rating);
  const [hover, setHover] = useState<number>(0);
  // state for bathroom type.
  const [type, setType] = useState<BathroomType>(formData.type);
  // state for form data.
  const [form, setForm] = useState(formData);

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
    if (!rating) return alert("Please leave a star rating!");
    if (matcher.hasMatch(form.content)) {
      alert("Looks like the review contains profanities. Please remove.");
      return;
    }
    try {
      const body = {
        ...form,
        rating: rating,
        type: type,
      };
      await fetch("/api/review", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push(`/places/${form.placeId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-8 max-w-[800px]">
        <form className="flex flex-col space-y-6" onSubmit={submitData}>
          <SmallTitle text="Edit Your Review" />
          <RestaurantCard
            restaurant={form.locationName}
            address={form.locationAddress}
            placeId={form.placeId}
          />

          {/*  Star Ratings -- help from https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}
          <div className={`cursor-pointer text-center drop-shadow-md`}>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || form.rating) ? "on" : "off"}
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
          <div className="ml-auto relative bottom-14 right-2">
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
          <span className="flex flex-col min-w-sm md:flex-row justify-evenly min-w-md bg-slate-100 rounded-xl drop-shadow-md overflow-hidden p-8">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                className="mb-4"
                label="Accessible to Wheelchairs"
                checked={form.accessible}
                onChange={() =>
                  setForm({ ...form, accessible: !form.accessible })
                }
              />

              <FormControlLabel
                control={<Checkbox checked={form.genderNeutral} />}
                className="mb-4"
                label="Gender Neutral Option"
                onChange={() =>
                  setForm({ ...form, genderNeutral: !form.genderNeutral })
                }
              />

              <FormControlLabel
                control={<Checkbox checked={form.changingTable} />}
                className="mb-4"
                label="Changing Table"
                onChange={() =>
                  setForm({ ...form, changingTable: !form.changingTable })
                }
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={form.clothTowels} />}
                className="mb-4"
                label="Cloth Hand Towels"
                onChange={() =>
                  setForm({ ...form, clothTowels: !form.clothTowels })
                }
              />
              <FormControlLabel
                control={<Checkbox checked={form.handDryer} />}
                className="mb-4"
                label="Hot Air Hand Dryer"
                onChange={() =>
                  setForm({ ...form, handDryer: !form.handDryer })
                }
              />
              <FormControlLabel
                control={<Checkbox checked={form.notClean} />}
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
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 px-6 mr-2 w-36 text-white bg-teal-500 rounded-lg baseline text-xl hover:bg-teal-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditReviewForm;

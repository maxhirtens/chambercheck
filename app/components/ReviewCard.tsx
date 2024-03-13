import Image from "next/image";
import Link from "next/link";
import prisma from "../lib/prisma";
import { StarIcon } from "./StarIcon";
import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

import dynamic from "next/dynamic";
const Tooltip = dynamic(() => import("@mui/material/Tooltip"), {
  ssr: false,
});

interface ReviewCardProps {
  date: string;
  restaurant: string;
  address: string;
  placeId: string;
  review: string;
  rating: string;
  authorId: string;
  accessible: boolean;
  genderNeutral: boolean;
  babyChanging: boolean;
  clothTowels: boolean;
  handDryer: boolean;
  notClean: boolean;
}

const ReviewCard = async (props: ReviewCardProps) => {
  const authorResult = await prisma.user.findFirstOrThrow({
    where: {
      id: props.authorId,
    },
  });
  const authorName = authorResult?.name;
  const authorImage = authorResult?.image;
  const ratingInt = parseInt(props.rating);

  return (
    <div className="min-w-md mx-auto max-w-3xl bg-slate-100 border-4 rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0"></div>
        <div className="p-6">
          <Link
            href={`/places/${props.placeId}`}
            className="block mt-1 mb-1 text-2xl leading-tight font-medium text-black hover:underline"
          >
            {props.restaurant}
          </Link>

          <div className="uppercase tracking-wide text-sm text-teal-500 font-semibold">
            {props.address}
          </div>

          <div className="drop-shadow-md">
            {/* Star Rating */}
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  disabled
                  key={index}
                  className={index <= ratingInt ? "on" : "off"}
                >
                  <span className="star ml-10">
                    <StarIcon />
                  </span>
                </button>
              );
            })}
          </div>
          {/* User avatar, name, and text review */}
          <div className="flex items-center mt-4">
            <Image
              src={authorImage!}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="mt-2 px-6 text-slate-500 text-center md:text-left max-w-4xl">
              {props.review}
            </p>
          </div>

          {/* amenities list */}
          <div className="flex flex-row space-x-5 pt-4 ">
            <div className="text-teal-500 space-x-3">
              {props.accessible && (
                <Tooltip title="Reviewer Noticed Restroom was Accessible">
                  <AccessibleOutlined fontSize="medium" />
                </Tooltip>
              )}
              {props.genderNeutral && (
                <Tooltip title="Reviewer Noticed All-Gender Restrooms">
                  <WcOutlined fontSize="medium" />
                </Tooltip>
              )}
              {props.babyChanging && (
                <Tooltip title="Reviewer Noticed a Baby Changing Station">
                  <BabyChangingStationOutlined fontSize="medium" />
                </Tooltip>
              )}
              {props.clothTowels && (
                <Tooltip title="Reviewer Noticed Cloth Hand Towels. Fancy!">
                  <DryCleaningOutlined fontSize="medium" />
                </Tooltip>
              )}
              {props.handDryer && (
                <Tooltip title="Reviewer Noticed a Hot-Air Hand Dryer">
                  <DryOutlined fontSize="medium" />
                </Tooltip>
              )}
            </div>
            <div className="text-orange-600">
              {props.notClean && (
                <Tooltip title="Reviewer Noticed A Mess or Other Issues">
                  <WarningAmberOutlined fontSize="medium" />
                </Tooltip>
              )}
            </div>
          </div>
          <div className="pt-4 uppercase tracking-wide text-xs text-slate-500 font-semibold">
            Review By: {authorName}
            <div>Date: {props.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

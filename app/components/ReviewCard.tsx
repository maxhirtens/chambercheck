import Image from "next/image";
import prisma from "@/app/lib/prisma";
import { StarIcon } from "./StarIcon";
import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const ReviewCard = async (props: {
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
}) => {
  const authorResult = await prisma.user.findFirstOrThrow({
    where: {
      id: props.authorId,
    },
  });
  const authorName = authorResult?.name;
  const authorImage = authorResult?.image;
  const ratingInt = parseInt(props.rating);

  return (
    <div className="min-w-md mx-auto bg-slate-100 rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0"></div>
        <div className="p-6">
          <a
            href={`/places/${props.placeId}`}
            className="block mt-1 mb-1 text-2xl leading-tight font-medium text-black hover:underline"
          >
            {props.restaurant}
          </a>

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
          <div className="pt-4 uppercase tracking-wide text-sm text-slate-500 font-semibold">
            Review By: {authorName}
            <p>Date: {props.date}</p>
          </div>
          {/* amenities list */}
          <div className="flex flex-row space-x-5 pt-4 ">
            <div className="text-teal-500 space-x-5">
              {props.accessible && (
                <Tooltip title="Reviewer Noticed Restroom was Accessible">
                  <AccessibleOutlined fontSize="large" />
                </Tooltip>
              )}
              {props.genderNeutral && (
                <Tooltip title="Reviewer Noticed All-Gender Restrooms">
                  <WcOutlined fontSize="large" />
                </Tooltip>
              )}
              {props.babyChanging && (
                <Tooltip title="Reviewer Noticed a Baby Changing Station">
                  <BabyChangingStationOutlined fontSize="large" />
                </Tooltip>
              )}
              {props.clothTowels && (
                <Tooltip title="Reviewer Noticed Cloth Hand Towels. Fancy!">
                  <DryCleaningOutlined fontSize="large" />
                </Tooltip>
              )}
              {props.handDryer && (
                <Tooltip title="Reviewer Noticed a Hot-Air Hand Dryer">
                  <DryOutlined fontSize="large" />
                </Tooltip>
              )}
            </div>
            <div className="text-orange-600">
              {props.notClean && (
                <Tooltip title="Reviewer Noticed A Mess or Other Issues">
                  <WarningAmberOutlined fontSize="large" />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

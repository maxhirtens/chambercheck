import Image from "next/image";
import prisma from "@/app/lib/prisma";
import { StarIcon } from "./StarIcon";
import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const SimpleReviewCard = async (props: {
  date: string;
  review: string;
  rating: string;
  authorId: string;
  accessible: boolean;
  genderNeutral: boolean;
  babyChanging: boolean;
  clothTowels: boolean;
  handDryer: boolean;
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
    <div className="min-w-md bg-slate-100 rounded-xl drop-shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0"></div>
        <div className="p-8">
          <div className="flex flex-col uppercase tracking-wide text-sm text-slate-500 font-semibold">
            Review By: {authorName}
            <p>Date: {props.date}</p>
          </div>
          <div>
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
          {/* User avatar and text review */}
          <div className="flex items-center mt-4">
            <Image
              src={authorImage!}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="px-6 text-slate-500 text-center md:text-left">
              {props.review}
            </p>
          </div>
          {/* amenities list */}
          <div className="flex flex-row space-x-5 pt-4 text-teal-400">
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
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewCard;

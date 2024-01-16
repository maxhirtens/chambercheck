import React from "react";
import Image from "next/image";
import prisma from "@/app/lib/prisma";
import { StarIcon } from "./StarIcon";

const ReviewCard = async (props: {
  restaurant: string;
  city: string;
  review: string;
  rating: string;
  userImage: string;
  authorId: string;
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
    <div className="max-w-md mx-auto bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0"></div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {props.city}
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {props.restaurant}
          </a>
          <div className="uppercase tracking-wide text-sm text-slate-500 font-semibold">
            Review By: {authorName}
          </div>
          <div className="drop-shadow-md flex flex-row items-center">
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
                  <span className="star">
                    <StarIcon dimensions="8" />
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
            <p className="mt-2 px-6 text-slate-500 text-center md:text-left">
              {props.review}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

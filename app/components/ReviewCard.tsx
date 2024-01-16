import React from "react";
import Image from "next/image";
import prisma from "../lib/prisma";

const ReviewCard = async (props: {
  restaurant: string;
  city: string;
  review: string;
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

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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

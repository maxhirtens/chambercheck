import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { StarIcon } from "./StarIcon";
import ReviewAmenities from "./ReviewAmenities";

const SimpleReviewCard = async (props: {
  date: string;
  review: string;
  rating: string;
  type: string;
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
    <div className="min-w-md max-w-3xl bg-slate-100 rounded-xl drop-shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0"></div>
        <div className="p-6">
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
          <div className="flex flex-row space-x-5 pt-4">
            <ReviewAmenities
              accessible={props.accessible}
              genderNeutral={props.genderNeutral}
              babyChanging={props.babyChanging}
              clothTowels={props.clothTowels}
              handDryer={props.handDryer}
              notClean={props.notClean}
            />
          </div>
          <div className="pt-4 uppercase tracking-wide text-xs text-slate-500 font-semibold">
            Review By:{" "}
            <Link
              className="hover:text-chamberCheckBlue"
              href={`/users/${props.authorId}`}
            >
              {authorName}
            </Link>
            <div>Rating For: The {props.type} restroom</div>
            <div>Date: {props.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewCard;

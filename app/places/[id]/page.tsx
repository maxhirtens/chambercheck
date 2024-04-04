import prisma from "../../lib/prisma";
import SmallTitle from "@/app/components/SmallTitle";
import Link from "next/link";
import SimpleReviewCard from "@/app/components/SimpleReviewCard";
import Image from "next/image";
import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

interface RouteParams {
  params: {
    id: string;
  };
}

const PlacesProfile = async ({ params: { id } }: RouteParams) => {
  // get place details from Google Places API.
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${id}?fields=addressComponents,formattedAddress,displayName&language_code=en&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  const locationName = response?.displayName?.text ?? "Loading...";
  const locationAddress = response?.formattedAddress ?? "Loading...";

  //   get reviews from db.
  const reviews = await prisma.review.findMany({
    where: { placeId: id },
    orderBy: {
      createdAt: "desc",
    },
  });

  //  get location.
  const location = await prisma.location.findUnique({
    where: {
      id: id,
    },
  });

  function averageRating() {
    return location.rating > 0 ? location.rating.toFixed(1) : "No Reviews Yet";
  }

  // calculate if recent reviews indicate a mess.
  function recentMess() {
    const recent = reviews.slice(-3);
    return recent.some((review) => review.notClean === true);
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-12 mb-24 drop-shadow-2xl">
      <div className="min-w-md mx-auto text-center pt-6 pb-8 px-6 bg-slate-100 rounded-xl overflow-hidden">
        <div className="flex flex-col">
          <SmallTitle text={locationName} />
          <div className="text-slate-500 py-6">{locationAddress}</div>
          {/* <p className="text-4xl">{locationName}</p> */}
          <Tooltip title="ChamberCheck Certified Top Restroom" placement="top">
            <div>
              {averageRating() !== "No Reviews Yet" &&
                averageRating() >= "4.5" && (
                  <div className="flex-col flex">
                    <Image
                      alt="golden toilet award"
                      src="/img/golden_toilet.png"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: "50px", height: "auto" }}
                      className="items-center mx-auto rounded-3xl shadow-md overflow-hidden mb-4"
                    />
                  </div>
                )}
            </div>
          </Tooltip>
        </div>

        <div className="text-lg">
          Average Restroom Rating:{" "}
          <div>
            <SmallTitle text={averageRating()} />
          </div>
        </div>
        {/* amenities list */}
        <div className="flex flex-row justify-center space-x-5 pt-4">
          <div className="text-teal-500 space-x-3">
            {reviews.some((review) => review.accessible === true) && (
              <Tooltip title="Reviewers Noticed Restroom was Accessible">
                <AccessibleOutlined fontSize="medium" />
              </Tooltip>
            )}
            {reviews.some((review) => review.genderNeutral === true) && (
              <Tooltip title="Reviewers Noticed All-Gender Restrooms">
                <WcOutlined fontSize="medium" />
              </Tooltip>
            )}
            {reviews.some((review) => review.changingTable === true) && (
              <Tooltip title="Reviewers Noticed a Baby Changing Station">
                <BabyChangingStationOutlined fontSize="medium" />
              </Tooltip>
            )}
            {reviews.some((review) => review.clothTowels === true) && (
              <Tooltip title="Reviewers Noticed Cloth Hand Towels. Fancy!">
                <DryCleaningOutlined fontSize="medium" />
              </Tooltip>
            )}
            {reviews.some((review) => review.handDryer === true) && (
              <Tooltip title="Reviewers Noticed a Hot-Air Hand Dryer">
                <DryOutlined fontSize="medium" />
              </Tooltip>
            )}
          </div>
          <div className="text-orange-600">
            {recentMess() && (
              <Tooltip title="Recent Reviewers Noticed A Mess or Other Issues">
                <WarningAmberOutlined fontSize="medium" />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <Link
        className="mx-8 bg-teal-500 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-teal-800 px-12"
        href={{
          pathname: "/reviews/new",
          query: {
            id: id,
          },
        }}
      >
        LEAVE A NEW REVIEW
      </Link>
      {reviews.map((review: any) => (
        <SimpleReviewCard
          key={review.id}
          date={review.createdAt.toLocaleString()}
          type={review.type}
          review={review.content}
          rating={review.rating}
          authorId={review.authorId}
          accessible={review.accessible}
          genderNeutral={review.genderNeutral}
          babyChanging={review.changingTable}
          clothTowels={review.clothTowels}
          handDryer={review.handDryer}
          notClean={review.notClean}
        />
      ))}
    </div>
  );
};

export default PlacesProfile;

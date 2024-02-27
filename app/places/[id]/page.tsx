import prisma from "@/app/lib/prisma";
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

  const locationName = response?.displayName?.text ?? "Unknown";
  const locationAddress = response?.formattedAddress ?? "Unknown";

  //   get reviews from db.
  const reviews = await prisma.review.findMany({
    where: { placeId: id },
    orderBy: {
      createdAt: "asc",
    },
  });

  function averageRating() {
    const avg =
      reviews.reduce((acc: number, res: any) => acc + res.rating, 0) /
      reviews.length;

    return avg > 0 ? avg.toFixed(1) : "No Reviews Yet";
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-12 mb-4 drop-shadow-2xl">
      <div className="min-w-md mx-auto text-center pb-8 px-12 bg-slate-100 rounded-xl overflow-hidden">
        <div className="flex flex-col">
          <SmallTitle text={locationName} />
          <Tooltip title="ChamberCheck Certified Top Restroom">
            <div>
              {averageRating() !== "No Reviews Yet" &&
                averageRating() >= "4.0" && (
                  <div className="flex-col flex">
                    <Image
                      alt="golden toilet award"
                      src="/img/golden_toilet.png"
                      width={40}
                      height={40}
                      className="items-center mx-auto rounded-3xl shadow-md overflow-hidden pt-4"
                    />
                  </div>
                )}
            </div>
          </Tooltip>
        </div>
        <div className="text-purple-800 py-6">{locationAddress}</div>
        <div>
          Reviews:
          <p className="text-teal-600">{reviews.length}</p>
          <br />
          Average Restroom Rating:{" "}
          <p className="text-orange-400">{averageRating()}</p>
        </div>
        {/* amenities list */}
        <div className="flex flex-row justify-center space-x-5 pt-4 text-teal-400">
          {reviews.some((review) => review.accessible === true) && (
            <Tooltip title="Reviewers Noticed Restroom was Accessible">
              <AccessibleOutlined fontSize="large" />
            </Tooltip>
          )}
          {reviews.some((review) => review.genderNeutral === true) && (
            <Tooltip title="Reviewers Noticed All-Gender Restrooms">
              <WcOutlined fontSize="large" />
            </Tooltip>
          )}
          {reviews.some((review) => review.changingTable === true) && (
            <Tooltip title="Reviewer Noticed a Baby Changing Station">
              <BabyChangingStationOutlined fontSize="large" />
            </Tooltip>
          )}
          {reviews.some((review) => review.clothTowels === true) && (
            <Tooltip title="Reviewers Noticed Cloth Hand Towels. Fancy!">
              <DryCleaningOutlined fontSize="large" />
            </Tooltip>
          )}
          {reviews.some((review) => review.handDryer === true) && (
            <Tooltip title="Reviewers Noticed a Hot-Air Hand Dryer">
              <DryOutlined fontSize="large" />
            </Tooltip>
          )}
        </div>
      </div>
      <Link
        className="mx-8 bg-teal-600 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-blue-500 px-12"
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
          review={review.content}
          rating={review.rating}
          authorId={review.authorId}
          accessible={review.accessible}
          genderNeutral={review.genderNeutral}
          babyChanging={review.changingTable}
          clothTowels={review.clothTowels}
          handDryer={review.handDryer}
        />
      ))}
    </div>
  );
};

export default PlacesProfile;

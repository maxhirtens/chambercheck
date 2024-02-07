import prisma from "@/app/lib/prisma";
import ReviewCard from "@/app/components/ReviewCard";
import Subtitle from "@/app/components/Subtitle";
import Link from "next/link";

interface RouteParams {
  params: {
    id: string;
  };
}

const PlacesProfile = async ({ params: { id } }: RouteParams) => {
  //   get reviews from db.
  const reviews = await prisma.review.findMany({
    where: { placeId: id },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-col items-center space-y-8 p-12 mb-4 drop-shadow-2xl">
      <Subtitle text={`Reviews for ${reviews[0].locationName}`} />
      <div className="text-purple-800 pb-8">{reviews[0].locationAddress}</div>

      <Link
        className="mx-8 bg-blue-800 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-blue-500 px-12"
        href={{
          pathname: "/reviews/new",
          query: {
            id: reviews[0].placeId,
          },
        }}
      >
        LEAVE A NEW REVIEW
      </Link>

      {reviews.map((review: any) => (
        <ReviewCard
          key={review.id}
          authorId={review.authorId}
          placeId={review.placeId}
          restaurant={review.locationName}
          address={review.locationAddress}
          review={review.content}
          rating={review.rating}
        />
      ))}
    </div>
  );
};

export default PlacesProfile;

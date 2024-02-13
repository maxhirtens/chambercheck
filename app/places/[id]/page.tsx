import prisma from "@/app/lib/prisma";
import Subtitle from "@/app/components/Subtitle";
import Link from "next/link";
import SimpleReviewCard from "@/app/components/SimpleReviewCard";

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

  function averageRating() {
    const avg =
      reviews.reduce((acc: number, res: any) => acc + res.rating, 0) /
      reviews.length;

    return avg > 0 ? avg.toFixed(1) : 0;
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-12 mb-4 drop-shadow-2xl">
      <div className="min-w-md mx-auto text-center bg-slate-100 rounded-xl shadow-md overflow-hidden">
        <Subtitle text={`Reviews for ${reviews[0].locationName}`} />
        <div className="text-purple-800 py-6">{reviews[0].locationAddress}</div>
        <div>Average Rating: {averageRating()}</div>
      </div>
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
        <SimpleReviewCard
          key={review.id}
          review={review.content}
          rating={review.rating}
          authorId={review.authorId}
        />
      ))}
    </div>
  );
};

export default PlacesProfile;

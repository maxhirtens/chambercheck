import ReviewCard from "./ReviewCard";
import Subtitle from "./Subtitle";
import prisma from "@/app/lib/prisma";

// const findAverageRating = async (name: string) => {
//   // find all reviews for single location.
//   const res = await prisma.review.findMany({
//     where: {
//       locationName: name,
//     },
//   });
//   // reduce ratings to average
//   const average: number =
//     res.reduce((acc: number, res: any) => acc + res.rating, 0) / res.length;

//   return average > 0 ? average.toFixed(1) : 0;
// };

const ReviewsBox = async () => {
  const reviews = await prisma.review.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div
      id="reviews"
      className="flex flex-col h-screen items-center space-y-12 p-12 drop-shadow-2xl"
    >
      <Subtitle text="Latest Reviews" />
      <div className="min-w-1/2 max-h-screen overflow-y-auto">
        {reviews.map((review: any) => (
          <div key={review.id} className="mb-6 pr-6">
            <ReviewCard
              authorId={review.authorId}
              restaurant={review.locationName}
              address={review.locationAddress}
              placeId={review.placeId}
              review={review.content}
              rating={review.rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsBox;

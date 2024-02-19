import ReviewCard from "./ReviewCard";
import Subtitle from "./Subtitle";
import prisma from "@/app/lib/prisma";

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
      <Subtitle text="Recent Reviews" />
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
              date={review.createdAt.toLocaleString()}
              accessible={review.accessible}
              genderNeutral={review.genderNeutral}
              babyChanging={review.changingTable}
              clothTowels={review.clothTowels}
              handDryer={review.handDryer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsBox;

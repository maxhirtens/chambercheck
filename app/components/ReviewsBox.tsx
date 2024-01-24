import ReviewCard from "./ReviewCard";
import Subtitle from "./Subtitle";
import prisma from "@/app/lib/prisma";
import SearchBar from "./SearchBar";
import Button from "./Button";

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
      <div className="flex flex-row mt-6 justify-center">
        <SearchBar placeholder="Search Reviews" />
        <Button text="Search" />
      </div>
      <div className="min-w-1/2 max-h-screen overflow-y-auto">
        {reviews.map((review: any) => (
          <div key={review.id} className="mb-6 pr-6">
            <ReviewCard
              authorId={review.authorId}
              restaurant={review.locationName}
              city={review.locationCity}
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

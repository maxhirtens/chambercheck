import ReviewCard from "./ReviewCard";
import Subtitle from "./Subtitle";
import prisma from "@/app/lib/prisma";

const ReviewsBox = async () => {
  const reviews = await prisma.review.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center space-y-12 p-12 drop-shadow-2xl">
        <Subtitle text="Latest Reviews" />
        {reviews.map((review: any) => (
          <ReviewCard
            key={review.id}
            authorId={review.authorId}
            restaurant={review.locationName}
            city={review.locationCity}
            review={review.content}
            rating={review.rating}
            userImage="/img/avatar-richard.png"
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsBox;

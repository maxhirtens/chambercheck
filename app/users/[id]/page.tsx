import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewCard from "@/app/components/ReviewCard";
import UserCard from "@/app/components/UserCard";
import Subtitle from "@/app/components/Subtitle";

const UserProfile = async () => {
  // get logged in user details.
  // replace with useSession hook.
  const session = await getServerSession(authOptions);
  // get their reviews from db.
  const reviews = await prisma.review.findMany({
    where: { author: { id: session!.user!.id } },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-col items-center space-y-12 p-12 mb-8 drop-shadow-2xl">
      <Subtitle text="Your Info" />
      <UserCard
        username={session!.user.name}
        email={session!.user.email}
        avatar={session!.user.image}
      />
      <Subtitle text="Your Reviews" />
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

export default UserProfile;

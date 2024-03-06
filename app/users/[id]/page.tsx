import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewCard from "@/app/components/ReviewCard";
import UserCard from "@/app/components/UserCard";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import prisma from "@/app/lib/prisma";
import SmallTitle from "@/app/components/SmallTitle";

const UserProfile = async () => {
  // get logged in user details.
  const session = await getServerSession(authOptions);

  const reviews = await prisma.review.findMany({
    where: {
      authorId: session!.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col items-center space-y-12 p-12 mb-8 drop-shadow-2xl">
      <SmallTitle text="Your Info" />
      <UserCard
        username={session!.user.name}
        email={session!.user.email}
        avatar={session!.user.image}
      />
      <SmallTitle text="Your Reviews" />
      <div className="min-w-[450px] max-h-screen overflow-y-auto">
        {reviews.map((review: any) => (
          <div className="flex-col pt-2 p-8" key={review.id}>
            <div className="flex-row justify-around mb-2 drop-shadow-sm"></div>
            <ReviewCard
              authorId={review.authorId}
              placeId={review.placeId}
              restaurant={review.locationName}
              address={review.locationAddress}
              review={review.content}
              rating={review.rating}
              date={review.createdAt.toLocaleString()}
              accessible={review.accessible}
              genderNeutral={review.genderNeutral}
              babyChanging={review.changingTable}
              clothTowels={review.clothTowels}
              handDryer={review.handDryer}
              notClean={review.notClean}
            />
            <div className="text-center space-x-4 mt-2">
              <EditButton id={review.id} />
              <DeleteButton id={review.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

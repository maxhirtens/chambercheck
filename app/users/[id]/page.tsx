import { getServerSession } from "next-auth/next";
import ReviewCard from "@/app/components/ReviewCard";
import UserCard from "@/app/components/UserCard";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import prisma from "@/app/lib/prisma";
import SmallTitle from "@/app/components/SmallTitle";
import { authOptions } from "@/app/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

const UserProfile = async ({ params: { id } }: RouteParams) => {
  // get logged in user details.
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const reviews = await prisma.review.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let authorizedUser = reviews[0].authorId === session!.user.id;

  return (
    <div className="flex flex-col items-center space-y-12 p-12 mb-24 drop-shadow-2xl">
      <SmallTitle text="Your Info" />
      <UserCard username={user.name} email={user.email} avatar={user.image} />
      <SmallTitle text="Your Reviews" />
      <div className="min-w-[350px] max-h-screen overflow-y-auto">
        {reviews.map((review: any) => (
          <div
            className="flex-col m-auto pt-2 p-8 w-80 md:w-auto"
            key={review.id}
          >
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
              {authorizedUser && (
                <EditButton id={review.id} authorId={review.authorId} />
              )}
              {authorizedUser && <DeleteButton id={review.id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

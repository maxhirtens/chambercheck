import { getServerSession } from "next-auth/next";
import ReviewCard from "@/app/components/ReviewCard";
import UserCard from "@/app/components/UserCard";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import prisma from "@/app/lib/prisma";
import SmallTitle from "@/app/components/SmallTitle";
import { authOptions } from "@/app/lib/auth";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const UserProfile = async (props: RouteParams) => {
  const params = await props.params;

  const {
    id
  } = params;

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

  // check for logged in user, and if the user is the owner of the profile page.
  let authorizedUser: Boolean = false;

  if (session && reviews.length > 0) {
    authorizedUser = reviews[0].authorId === session!.user.id;
  }

  // check for power user status.
  let status = "Verified User";

  if (reviews.length > 3) {
    status = "ChamberCheck Expert Reviewer";
  }

  return (
    <div className="flex flex-col items-center space-y-12 p-12 mb-24 drop-shadow-2xl">
      <SmallTitle text="User Info" />
      <UserCard username={user.name} avatar={user.image} status={status} />
      <SmallTitle text="User Reviews" />
      <div className="min-w-[350px] max-h-screen overflow-y-auto">
        {reviews.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <p className="text-2xl">No reviews yet!</p>
          </div>
        )}
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
              type={review.type}
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

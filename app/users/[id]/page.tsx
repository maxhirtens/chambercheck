import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewCard from "@/app/components/ReviewCard";
import UserCard from "@/app/components/UserCard";
import Subtitle from "@/app/components/Subtitle";
import DeleteButton from "@/app/components/DeleteButton";
import prisma from "@/app/lib/prisma";

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
      <Subtitle text="Your Info" />
      <UserCard
        username={session!.user.name}
        email={session!.user.email}
        avatar={session!.user.image}
      />
      <Subtitle text="Your Reviews" />
      {reviews.map((review: any) => (
        <div className="flex flex-col pt-8" key={review.id}>
          <div className="flex flex-row justify-around mb-2 drop-shadow-sm">
            {/* replace with component like DELETE BUTTON */}
            {/* <div className="float-left">
              <Link className="text-indigo-600" href="#">
                <Edit fontSize="large" />
                Edit Review
              </Link>
            </div> */}
            <div className="float-right">
              <DeleteButton id={review.id} />
            </div>
          </div>
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
          />
        </div>
      ))}
    </div>
  );
};

export default UserProfile;

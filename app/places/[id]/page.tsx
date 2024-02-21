import prisma from "@/app/lib/prisma";
import Subtitle from "@/app/components/Subtitle";
import Link from "next/link";
import SimpleReviewCard from "@/app/components/SimpleReviewCard";
import Image from "next/image";

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

    return avg > 0 ? avg.toFixed(1) : "No Reviews Yet";
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-12 mb-4 drop-shadow-2xl">
      <div className="min-w-md mx-auto text-center pb-8 bg-slate-100 rounded-xl shadow-md overflow-hidden">
        <Subtitle text={`${reviews[0].locationName}`} />
        <div className="text-purple-800 py-6">{reviews[0].locationAddress}</div>
        {reviews[0].accessible && <div>Accessible</div>}
        <div>
          <p className="text-orange-400">
            {reviews.length} Review{reviews.length > 1 && "s"}
          </p>
          <br />
          Average Restroom Rating:{" "}
          <p className="text-orange-400">{averageRating()}</p>
        </div>
        {averageRating() >= "4.0" && (
          <Image
            alt="golden toilet award"
            src="/img/golden_toilet.png"
            width={120}
            height={120}
            className="items-center mx-auto"
          />
        )}
      </div>
      <Link
        className="mx-8 bg-teal-600 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-blue-500 px-12"
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
          date={review.createdAt.toLocaleString()}
          review={review.content}
          rating={review.rating}
          authorId={review.authorId}
          accessible={review.accessible}
          genderNeutral={review.genderNeutral}
          babyChanging={review.changingTable}
          clothTowels={review.clothTowels}
          handDryer={review.handDryer}
        />
      ))}
    </div>
  );
};

export default PlacesProfile;

"use client";
import { useState, useEffect } from "react";
import ReviewForm from "@/app/components/ReviewForm";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

// protected route for logged in users
export default function ReviewPage() {
  const [restoData, setRestoData] = useState({});

  // const session = await getServerSession(authOptions);
  const session = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const searchParams = useSearchParams();
  const placeId: string = searchParams.get("id") ?? "No Info Available";

  useEffect(() => {
    fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=addressComponents,displayName&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRestoData(data);
      });
  }, []);

  const authorName = session?.data?.user?.name ?? "Anonymous";
  const authorEmail = session?.data?.user?.email ?? "anon@anon.com";
  const locationName = restoData?.displayName?.text ?? "Unknown";
  const locationCity = restoData?.addressComponents?.[3]?.longText ?? "Unknown";

  return (
    <div className="relative container mx-auto p-12">
      <ReviewForm
        authorName={authorName}
        authorEmail={authorEmail}
        locationName={locationName}
        locationCity={locationCity}
      />
    </div>
  );
}

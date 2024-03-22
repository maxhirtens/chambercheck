"use client";
import { useState, useEffect } from "react";
import ReviewForm from "@/app/components/ReviewForm";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

// protected route for logged in users
export default function ReviewPage() {
  const loading = "Loading...";

  const [restoData, setRestoData] = useState({
    displayName: { text: loading },
    formattedAddress: loading,
    placeId: loading,
  });

  const session = useSession();

  if (!session?.data?.user?.name) {
    signIn();
  }

  const searchParams = useSearchParams();
  const placeId: string = searchParams.get("id") ?? "No Info Available";

  useEffect(() => {
    fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=addressComponents,formattedAddress,displayName&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRestoData(data);
      });
  }, [placeId]);

  const authorName = session?.data?.user?.name ?? loading;
  const authorEmail = session?.data?.user?.email ?? loading;
  const locationName = restoData?.displayName?.text ?? loading;
  const locationAddress = restoData?.formattedAddress ?? loading;

  return (
    <div className="relative container mx-auto mb-24 p-12">
      <ReviewForm
        authorName={authorName}
        authorEmail={authorEmail}
        locationName={locationName}
        locationAddress={locationAddress}
        placeId={placeId}
      />
    </div>
  );
}

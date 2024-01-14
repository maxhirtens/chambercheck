import React from "react";
import ReviewForm from "@/app/components/ReviewForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// protected route for logged in users
export default async function ReviewPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const authorName = session?.user?.name ?? "Anonymous";
  const authorEmail = session?.user?.email ?? "anon@anon.com";
  // change these to be dynamic from user clicking on a location
  const locationName: string = "The Stinking Rose";
  const locationCity: string = "San Francisco, CA";

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

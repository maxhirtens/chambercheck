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

  return (
    <div className="relative container mx-auto p-12">
      <ReviewForm />
    </div>
  );
}

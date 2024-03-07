"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EditReviewForm from "@/app/components/EditReviewForm";

// protected route for logged in users
export default function EditReviewPage() {
  const session = useSession();

  const [formData, setFormData] = useState();

  if (!session?.data?.user?.name) {
    redirect("/api/auth/signin");
  }

  const searchParams = useSearchParams();
  const reviewId: string = searchParams.get("id") ?? "No Info Available";

  useEffect(() => {
    fetch(`/api/single-review/${reviewId}`)
      .then((res) => res.json())
      .then((data: any) => {
        setFormData(data.review);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reviewId]);

  return (
    <div className="relative container mx-auto p-12">
      {formData && <EditReviewForm formData={formData!} />}
    </div>
  );
}

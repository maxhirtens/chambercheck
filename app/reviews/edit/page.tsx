"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EditReviewForm from "@/app/components/EditReviewForm";

// protected route for logged in users
export default function EditReviewPage() {
  const session = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<any>();

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

  if (formData && formData.authorId !== session?.data?.user?.id) {
    router.push("/not-found");
  }

  return (
    <div className="relative container mx-auto mb-24 p-12">
      {formData && <EditReviewForm formData={formData!} />}
    </div>
  );
}

"use client";
import { Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditButton = (props: { id: number; authorId: string }) => {
  const router = useRouter();
  const session = useSession();

  const handleEdit = async () => {
    if (session?.data?.user?.id !== props.authorId) {
      router.push("/api/auth/signin");
    }
    router.push(`/reviews/edit?id=${props.id}`);
  };

  return (
    <button
      className="bg-teal-600 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-teal-800 px-4"
      type="button"
      onClick={() => handleEdit()}
    >
      <span className="flex flex-row">
        <Edit fontSize="medium" />
        <div className="hidden md:block">Edit Review</div>
      </span>
    </button>
  );
};

export default EditButton;

"use client";
import { Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const DeleteButton = (props: { id: number }) => {
  const router = useRouter();

  const handleDelete = (id: number) => async () => {
    const shouldRemove = confirm(
      "Are you sure you want to delete this review?"
    );

    if (shouldRemove) {
      await fetch("/api/review", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      router.refresh();
    }
  };

  return (
    <button
      className="bg-red-700 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-red-600 px-4"
      type="button"
      onClick={handleDelete(props.id)}
    >
      <span className="flex flex-row">
        <Delete fontSize="medium" />
        <div className="hidden md:block">Delete Review</div>
      </span>
    </button>
  );
};

export default DeleteButton;

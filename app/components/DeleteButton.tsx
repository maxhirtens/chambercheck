"use client";
import { Delete } from "@mui/icons-material";

const DeleteButton = (props: { id: number }) => {
  const handleDelete = (id: number) => async () => {
    const response = await fetch("/api/review", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  };

  return (
    <button
      className="bg-red-800 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-red-600 px-4"
      type="button"
      onClick={handleDelete(props.id)}
    >
      <Delete fontSize="large" />
      Delete Review
    </button>
  );
};

export default DeleteButton;

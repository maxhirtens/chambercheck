import React from "react";
import Subtitle from "./Subtitle";
import prisma from "@/app/lib/prisma";

const AdminReviewList = async () => {
  const reviews = await prisma.review.findMany();

  return (
    <div className="relative container mx-auto p-12">
      <Subtitle text="ChamberCheck Reviews" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full mt-8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-200">
            <tr>
              <th>Review ID</th>
              <th>Restaurant Name</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Rating</th>
              <th>Content</th>
              <th>Accessible</th>
              <th>Gender Neutral</th>
              <th>Changing Table</th>
              <th>Cloth Towels</th>
              <th>Hot Air Hand Dryer</th>
              <th>Dirty</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr
                key={review.id}
                className="odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700 dark:text-gray-200"
              >
                <td>{review.id}</td>
                <td>{review.locationName}</td>
                <td>{review.locationAddress}</td>
                <td>{review.createdAt.toLocaleString()}</td>
                <td>{review.rating}</td>
                <td>{review.content}</td>
                <td>{review.accessible?.toString()}</td>
                <td>{review.genderNeutral?.toString()}</td>
                <td>{review.changingTable?.toString()}</td>
                <td>{review.clothTowels?.toString()}</td>
                <td>{review.handDryer?.toString()}</td>
                <td>{review.notClean?.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewList;

import React from "react";
import prisma from "../lib/prisma";

const ReviewList = async () => {
  const reviews = await prisma.review.findMany();
  return (
    <div className="relative container mx-auto p-12">
      <h1> ChamberCheck Reviews </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-200">
          <tr>
            <th>Review ID</th>
            <th>Location</th>
            <th>Content</th>
            <th>Date</th>
            <th>Author</th>
            <th>Live?</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              className="odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700 dark:text-gray-200"
            >
              <td>{review.id}</td>
              <td>{review.title}</td>
              <td>{review.content}</td>
              <td>{review.createdAt.toLocaleString()}</td>
              <td>{review.authorId}</td>
              <td>{review.published.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;

import React from "react";
import prisma from "../lib/prisma";

const UserList = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="relative container mx-auto p-12">
      <h1> ChamberCheck Users </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-200">
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>User Email</th>
            <th>Reviews</th>
            <th>Admin?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700 dark:text-gray-200"
            >
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td></td>
              <td>{user.isAdmin.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

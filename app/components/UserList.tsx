import React from "react";
import prisma from "../lib/prisma";

const UserList = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="flex min-h-screen flex-col items-start p-24">
      <h1> All Users </h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="list-none">
            <div>
              {user.userName} - {user.email}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

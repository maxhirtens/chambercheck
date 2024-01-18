"use client";
import prisma from "@/app/lib/prisma";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Params = {
  id: string;
};

const UserProfile = () => {
  const { data: session } = useSession();
  return (
    <div className="container flex flex-col items-center justify-center m-12">
      <h1>{session!.user!.name}</h1>
      <h2>{session!.user!.email}</h2>
      <Image
        src={session!.user!.image!}
        alt="user avatar"
        width={50}
        height={50}
      />
    </div>
  );
};

export default UserProfile;

// export default async function UserProfile(props: { params: Params }) {
//   const { id } = props.params;
//   const user = await prisma.user.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   return (
//     <div className="container flex flex-col items-center justify-center m-12">
//       <h1>{user!.name}</h1>
//       <h2>{user!.email}</h2>
//       <Image src={user!.image!} alt="user avatar" width={50} height={50} />
//     </div>
//   );
// }

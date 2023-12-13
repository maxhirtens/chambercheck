import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// export async function getServerSideProps() {
//   const users = await prisma.user.findMany();
//   return {
//     props: {
//       initialUsers: users,
//     },
//   };
// }

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ message: users });
}

export async function POST() {
  return NextResponse.json({ message: "Hello - POST" });
}

export async function PUT() {
  return NextResponse.json({ message: "Hello - PUT" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello - DELETE" });
}

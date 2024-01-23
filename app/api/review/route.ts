import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  const reviews = await prisma.review.findMany();

  return Response.json({ reviews });
}

export async function POST(request: NextRequest) {
  const {
    authorEmail,
    locationName,
    locationCity,
    rating,
    content,
    accessible,
    genderNeutral,
    changingTable,
    clothTowels,
    femProducts,
    handDryer,
  } = await request.json();

  const authorResult = await prisma.user.findUniqueOrThrow({
    where: {
      email: authorEmail,
    },
  });

  const authorId: string = authorResult.id;

  const result = await prisma.review.create({
    data: {
      authorId: authorId,
      locationName,
      locationCity,
      rating,
      content,
      accessible,
      genderNeutral,
      changingTable,
      clothTowels,
      femProducts,
      handDryer,
    },
  });

  return NextResponse.json({
    message: "Review submitted",
    result: result,
  });
}

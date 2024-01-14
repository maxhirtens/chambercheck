import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

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
  } = await request.json();

  const authorResult = await prisma.user.findUniqueOrThrow({
    where: {
      email: authorEmail,
    },
  });

  console.log(authorResult);

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
    },
  });

  console.log(result);

  return NextResponse.json({
    message: "Review submitted",
  });
}

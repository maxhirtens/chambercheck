import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

// GET all user reviews
export async function GET(request: NextRequest) {
  const reviews = await prisma.review.findMany();
  return Response.json({ reviews });
}

// POST new user review
export async function POST(request: NextRequest) {
  const {
    authorEmail,
    locationName,
    locationAddress,
    placeId,
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
      locationAddress,
      placeId,
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

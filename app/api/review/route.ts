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
      handDryer,
    },
  });

  return NextResponse.json({
    message: "Review submitted",
    result: result,
  });
}

// Edit user review.
export async function PATCH(request: NextRequest) {
  const {
    id,
    rating,
    accessible,
    content,
    changingTable,
    clothTowels,
    genderNeutral,
    handDryer,
  } = await request.json();

  const result = await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      rating: rating,
      content: content,
      changingTable: changingTable,
      clothTowels: clothTowels,
      genderNeutral: genderNeutral,
      handDryer: handDryer,
      accessible: accessible,
    },
  });
  console.log("Editing review " + id);
  return NextResponse.json({ message: "Review edited", result: result });
}

// Delete user review.
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.review.delete({
    where: {
      id: id,
    },
  });
  console.log("Deleting review " + id);
  return NextResponse.json("Review Deleted");
}

import { type NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

// GET all user reviews
export async function GET(request: NextRequest) {
  const { placeId } = await request.json();

  const reviews = await prisma.review.findFirstOrThrow({
    where: {
      placeId: placeId,
    },
  });
  console.log("WE DID IT!");
  return Response.json({ reviews });
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Handles POST requests to /api/reviews
export async function POST(request: NextRequest) {
  const { title, content } = await request.json();
  let dateTime = new Date();

  const review = {
    title,
    createdAt: dateTime,
    content,
    published: true,
  };

  console.log(review);

  await prisma.review.create({ data: review });

  return NextResponse.json(review);
}

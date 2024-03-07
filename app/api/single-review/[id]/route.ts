import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const review = await prisma.review.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json({ review });
}

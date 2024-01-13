import { getSession } from "next-auth/react";
import prisma from "@/app/lib/prisma";

// POST /api/post
// Required fields in body: rating, content
// Optional fields in body:
export default async function handle(req, res) {
  const { rating, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.review.create({
    data: {
      rating: rating,
      content: content,
      author: { connect: { name: session?.user?.name } },
    },
  });
  res.json(result);
}

import { type NextRequest } from "next/server";
import prisma from "../../lib/prisma";

// GET all locations
export async function GET(request: NextRequest) {
  const locations = await prisma.location.findMany();
  return Response.json({ locations });
}

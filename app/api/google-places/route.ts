import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// sample URL: http://localhost:3000/api/google-places?category=indian&radius=1000&lat=37.7753514&lng=-122.4240233

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = "restaurant";
  const radius = "500";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log("lat: " + lat + " lng: " + lng);
  const res = await fetch(
    BASE_URL +
      "/textsearch/json?query=" +
      category +
      "&location=" +
      lat +
      "," +
      lng +
      "&radius=" +
      radius +
      "&key=" +
      GOOGLE_API_KEY,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const product = await res.json();

  return NextResponse.json({ product });
}

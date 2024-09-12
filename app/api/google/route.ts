import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  const { address } = await request.json();
  console.log(address);

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      if (!address) {
        return NextResponse.json(
          { error: "Address is required" },
          { status: 400 },
        );
      }

      const apiKey = process.env.GOOGLE_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
      );

      const data = await response.json();

      if (data.results.length === 0) {
        return NextResponse.json(
          { error: "No location found" },
          { status: 404 },
        );
      }

      const { lat, lng } = data.results[0].geometry.location;

      // return NextResponse.json({ lat, lng });

      const updateUserGeo = await prisma.user.update({
        where: { email: session.user?.email as string },
        data: {
          latitude: lat,
          longitude: lng,
        },
      });
      return NextResponse.json({ updateUserGeo });
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from test route" });
}

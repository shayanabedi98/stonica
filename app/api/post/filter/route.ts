import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let filterOptions = null;

  try {
    const body = await req.json();
    filterOptions = body.filterOptions;
  } catch (error) {
    console.log("No JSON passed");
  }

  if (filterOptions) {
    console.log(filterOptions);
    try {
      const getPosts = await prisma.post.findMany({
        include: { User: true },
      });
      return NextResponse.json(getPosts);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Could not get products" });
    }
  } else {
    console.log("Filter Options does not exist");
    return;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const {
      minPriceRange,
      maxPriceRange,
      stoneType,
      textureType,
      baseColor,
      veinColor,
      secondaryColor,
      veins,
      bookmatched,
    } = filterOptions;

    try {
      // Build the where clause
      const where: any = {
        OR: [
          {
            salePrice: {
              not: null,
              gte: minPriceRange,
              lte: maxPriceRange,
            },
          },
          {
            AND: [
              { salePrice: null },
              {
                price: {
                  gte: minPriceRange,
                  lte: maxPriceRange,
                },
              },
            ],
          },
        ],
      };

      // Add stone type filter if array is not empty
      if (stoneType.length > 0) {
        where.type = {
          in: stoneType,
        };
      }

      // Add texture type filter if array is not empty
      if (textureType.length > 0) {
        where.textureType = {
          in: textureType,
        };
      }

      // Add veins filter if selected
      if (baseColor !== "- Select -") {
        where.baseColor = baseColor;
      }

      if (veinColor !== "- Select -") {
        where.veinColor = veinColor;
      }

      if (secondaryColor !== "- Select -") {
        where.secondaryColor = secondaryColor;
      }

      if (veins !== "- Select -") {
        where.veins = veins;
      }

      // Add bookmatched filter if selected
      if (bookmatched !== "- Select -") {
        where.bookmatched = bookmatched;
      }

      const getPosts = await prisma.post.findMany({
        where,
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

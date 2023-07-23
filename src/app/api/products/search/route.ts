import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const text = searchParams.get("text");

    if(!text){
        return new NextResponse(
            JSON.stringify({
              message: "Missing text parameter",
            }),
            { status: 400 }
          );
    }


    const products = await prisma.products.findMany({
        where: {
            category: text
        }
    })


    return new NextResponse(JSON.stringify(products), { status: 200 });



}
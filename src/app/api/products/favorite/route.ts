import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(request: Request) {

    const userSession = await getServerSession(authOptions)

    const req = await request.json();

    const { data } = req;

    const response = await prisma.favorites.findFirst({
        where: {
            productsId: data.id 
        }
    })


    if(response){
        return new NextResponse(
            JSON.stringify({
              error: {
                code: "FAVORITE_ALREADY_EXISTS",
              },
            })
          );
    }

    if(!response){
        await prisma.favorites.create({
            data: {
                productsId: data.id,
                userId: (userSession?.user as any)?.id
            }
        })

        return new NextResponse(JSON.stringify({
            success: true,
        }),
            { status: 200 }
        )
    }

    

    
}
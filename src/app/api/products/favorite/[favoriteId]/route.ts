import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params: { favoriteId } }: { params: { favoriteId : string } }) {


    if (!favoriteId) {
        return {
            status: 400,
            body: {
                message: 'Missing userId'
            }
        }
    }

    const reservation = await prisma.favorites.delete({
        where: {
            id: favoriteId,

        }
    })

    return new NextResponse(JSON.stringify(reservation), { status: 200 })
}
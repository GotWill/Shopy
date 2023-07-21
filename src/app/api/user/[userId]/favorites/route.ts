import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
    const { searchParams } = new URL(request.url)


    if (!userId) {
        return {
            status: 400,
            body: {
                message: 'Missing userId'
            }
        }
    }

    const favorites = await prisma.favorites.findMany({
        where: {
            userId: userId,
        },
        include: {
            Products: true
        }
    })

    return new NextResponse(JSON.stringify(favorites), {status: 200})
}
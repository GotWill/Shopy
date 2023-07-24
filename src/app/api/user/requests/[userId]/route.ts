import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { userId} }: { params: { userId: string } }) {


    if (!userId) {
        return {
            status: 400,
            body: {
                message: 'Missing userId'
            }
        }
    }

    const requests = await prisma.requests.findMany({
        where: {
            userId: userId,
        },
        include: {
            Products: true
        }
    })


    return new NextResponse(JSON.stringify(requests), {status: 200})
}
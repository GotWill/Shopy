import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { authOptions } from '../auth/[...nextauth]/route'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
})

export async function POST(request: Request) {

    const userSession = await getServerSession(authOptions)
    

    const req = await request.json()

    const [firstProduct] = req.products;

    const { data } = firstProduct;
    const { product, qnt } = data;


     const {productId, name, image, description, price } = product


     const session = await stripe.checkout.sessions.create({
        success_url: process.env.SUCCESS_URL!,
        metadata: {
            productId,
            name,
            image,
            description,
            userId: (userSession?.user as any)?.id,
            price
        },
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    unit_amount: price * 100,
                    product_data: {
                        name,
                        description,
                        images: [image]
                    }
                },
                quantity: qnt
            }
        ],
        mode: 'payment'

    })


    return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 })
}
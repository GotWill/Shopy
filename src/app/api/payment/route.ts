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

    const lineItems = req.products.map((productItem: any) => {
        const { data } = productItem;
        const { product, qnt } = data;
        const { id, name, image } = product;

        return {
            price_data: {
                currency: 'brl',
                unit_amount: product.price * 100,
                product_data: {
                    name,
                    images: [image]
                }
            },
            quantity: qnt
        };
    });

    // Criar objeto que representa as informações do carrinho
    const cartMetadata = {
        userId: (userSession?.user as any)?.id,
        productIds: req.products.map((productItem: any) => {
            const { data } = productItem;
            const { product } = data;
            const { id } = product;

            return id;
        }),
    };

    // Converter o objeto cartMetadata para uma string JSON válida
    const metadataString = JSON.stringify(cartMetadata);

    const session = await stripe.checkout.sessions.create({
        success_url: process.env.SUCCESS_URL!,
        metadata: { cart_data: metadataString }, // Usar um objeto para metadata com uma chave e o valor convertido em string
        line_items: lineItems,
        mode: 'payment'
    });

    return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 })
}

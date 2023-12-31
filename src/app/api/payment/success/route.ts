import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
})

export async function POST(request: Request) {
    const sig = request.headers.get("stripe-signature")!;
    const text = await request.text();
    const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!);

    

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        console.log(session)
        let productsInfoHTML = "";

        const amountTotal = session.amount_total;

        const formattedAmount = (amountTotal / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        const cartData = JSON.parse(session.metadata.cart_data);
        const { userId } = cartData;
        const products = cartData.productIds;


        for (const product of products) {
            await prisma.requests.create({
                data: {
                   productsId: product,
                   userId: userId,
                }
            });


            
            
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'williansouza9687a@gmail.com',
                pass: process.env.GOOGLE_PASSWORD_EMAIL,
            },
        });
        const mailOptions = {
            from: 'williansouza9687a@gmail.com',
            to: `${session.customer_details.email}`,
            subject: 'Shopy',
            html: `
                <h1 style="font-size: 20px; margin-bottom: 0;"> Olá <strong style="color:#0989ff">${session.customer_details.name}</strong> </h1> <br>
                <p style="margin-top: 0; color: #0f172a">Agradecemos por comprar conosco</p>
                <p>Valor Total do seu pedido <strong style="color:#0989ff">${formattedAmount}</strong> </p>
               
            `,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('E-mail enviado:', info.response);
        } catch (error) {
            console.log('Erro ao enviar o e-mail:', error);
        }
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}

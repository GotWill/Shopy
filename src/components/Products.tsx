import { prisma } from "@/app/lib/prisma";
import IconHeart from "@/icons/iconHeart";
import IconShoppingCart from "@/icons/iconShoppingCart";
import IconStar from "@/icons/iconStart";
import Image from "next/image";
import { CardItem } from "./CardItem";


export const allProducts = async () => {
    const data = prisma.products.findMany()
    return data
}

export async function Products() {

    const products = await allProducts();

    return (
        <section className="container mx-auto px-5 my-14 flex flex-col justify-center gap-4 md:flex-row md:flex-wrap">

            {
                products.map((product) => {
                    return (
                        <CardItem   product={product} key={product.id}/>
                    )
                })
            } 
        </section>
    )
}
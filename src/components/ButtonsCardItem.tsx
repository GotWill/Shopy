'use client'

import { ProductContext } from "@/context/listProducts";
import IconHeart from "@/icons/iconHeart";
import IconShoppingCart from "@/icons/iconShoppingCart";
import { Products } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { toast } from "react-toastify";

interface ButtonsCardsItemProps {
    product: Products;
}

export function ButtonsCardsItem({ product }: ButtonsCardsItemProps) {

    const { addProducts, listProducts } = useContext(ProductContext)

    const { status, data } = useSession();



    async function addFavoriteItem() {

        if(status  === 'unauthenticated'){
            return toast.warning("Você precisa estar logado para prosseguir.", { position: 'top-right' })
        }

        const response = await fetch('/api/products/favorite', {
            method: 'POST',
            body: Buffer.from(JSON.stringify({
                data: product

            })),
        })

        const req = await response.json();

        if (req?.error?.code !== 'FAVORITE_ALREADY_EXISTS') {
            toast.success('Produto adicionado aos favoritos')
        }


        if (req?.error?.code === 'FAVORITE_ALREADY_EXISTS') {
            toast.warning('Produto já foi adicionado aos favoritos.')
        }
    }

    function handleAddToCart() {
        const newList = [...listProducts]

        const productExists = listProducts.find((item) => item.data.product.id === product.id);

        if (!productExists) {
            newList.push({
                data: {
                    product: {
                        id: product.id,
                        name: product.name,
                        badge: product.badge,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        price: product.price,
                        userId: ''
                    },
                    qnt: 1
                },
               

            })

            addProducts(newList)

            toast.success('Produto adicionado ao carrinho.')
        }else {
            toast.warning('Produto ja foi adicionado ao carrinho. ')
        }





    }

    return (
        <div className="absolute -top-10 right-4 h-full flex items-center invisible group-hover:visible">
            <div className="flex flex-col items-center  shadow-2xl">
                <button onClick={handleAddToCart} className="w-10 h-10 border border-[#eaebed] flex justify-center items-center group/btn hover:bg-[#0989ff]" title="Adicionar ao carinho">
                    <IconShoppingCart className="group-hover/btn:text-white text-[#0989ff]" width={24} height={24} />
                </button>
                <button onClick={addFavoriteItem} className="w-10 h-10 border border-[#eaebed] flex justify-center items-center group/btn hover:bg-[#0989ff]" title="Favoritar produto">
                    <IconHeart className="group-hover/btn:text-white text-[#0989ff]" width={24} height={24} />
                </button>



            </div>
        </div>
    )
}
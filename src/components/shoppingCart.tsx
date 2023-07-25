'use client'

import { ProductContext } from "@/context/listProducts";
import { Trash2, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js"

interface shoppingCartProps {
    open: boolean;
    closeDialog: () => void;
}

export function ShoppingCart({ open, closeDialog }: shoppingCartProps) {
    const { status} = useSession();


    const { addProducts, listProducts } = useContext(ProductContext)
    const [valueFormat, setFormattedValue] = useState('');


    const calculateTotalValue = (): number => {
        const totalValue = listProducts.reduce(
            (acc, item) => acc + item.data.product.price * item.data.qnt,
            0
        );
        return totalValue;
    };


    useEffect(() => {
        const totalValue = calculateTotalValue();
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency"
        }).format(totalValue);

        setFormattedValue(formattedValue);
    }, [listProducts]);



    function handleIncrement(productId: string) {
        const productIndex = listProducts.findIndex((item) => item.data.product.id === productId);

        if (productIndex !== -1) {
            const updatedList = [...listProducts];
            const updatedProduct = { ...updatedList[productIndex] };

            updatedProduct.data.qnt += 1;
            updatedList[productIndex] = updatedProduct;

            addProducts(updatedList);
        }
    }


    function handleDecrement(productId: string) {
        const productIndex = listProducts.findIndex((item) => item.data.product.id === productId);

        if (productIndex !== -1) {
            const updatedList = [...listProducts];
            const updatedProduct = { ...updatedList[productIndex] };

            if (updatedProduct.data.qnt > 1) {
                updatedProduct.data.qnt -= 1;
                updatedList[productIndex] = updatedProduct;

                addProducts(updatedList);
            }


        }
    }


    function deleteProduct(productId: string) {
        const newList = [...listProducts].filter((item) => item.data.product.id !== productId)
        addProducts(newList)
    }

    async function handleByClick() {

        if (status === 'unauthenticated') {
            return toast.warning("Você precisa estar logado para prosseguir.", { position: 'top-right' })
        }

        const res = await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify({
                products: listProducts

            }),


        })

        if (!res.ok) {
            return toast.error("Ocorreu um erro ao realizar sua compra!", { position: 'bottom-center' })
        }


        const { sessionId } = await res.json()

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)

        await stripe?.redirectToCheckout({ sessionId })

    }

    return (

        <div className={`absolute w-full  md:w-[400px]  ${listProducts.length > 0 ? '' : ''} top-20 rounded-lg  right-0 bg-white z-10 shadow-2xl`}>
            <div className="flex justify-between items-center p-4">
                <span className="text-lg text-slate-900 font-bold">SHOPPING CART</span>


                <XCircle className="cursor-pointer" width={24} height={24} onClick={closeDialog} />

            </div>

            <div className="border-t-slate-700 border border-solid">

                {
                    listProducts.map((product) => {
                        return (
                            <div className="flex justify-between items-start p-3" key={product.data.product.id}>
                                <div className="flex flex-col items-baseline gap-2">
                                    <Image src={product.data.product.image} width={100} height={100} alt="" />
                                </div>
                                <div className="flex items-center gap-5 p-2 border-solid border-2 border-slate-300 rounded-xl">
                                    <button className="text-base text-black" onClick={() => handleIncrement(product.data.product.id)}>+</button>
                                    <span className="font-medium text-base text-slate-900">
                                        {product.data.qnt}
                                    </span>
                                    <button onClick={() => handleDecrement(product.data.product.id)} className="text-base text-black">-</button>
                                </div>
                                <div>
                                    <button onClick={() => deleteProduct(product.data.product.id)}>
                                        <Trash2 width={24} height={24} />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                listProducts.length > 0 ? (
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center p-3">
                            <h3 className="font-medium text-slate-900 text-base">SubTotal</h3>
                            <span className="font-bold text-xl text-slate-800">{valueFormat}</span>
                        </div>

                        <button onClick={() => handleByClick()} className="mx-4 text-[#0989ff] my-3 border-[#0989ff] border hover:bg-[#0989ff] bg-transparent hover:text-white p-2 text-base rounded-xl">
                            checkout
                        </button>
                    </div>
                ) : (
                    <div className="p-4">
                        <h3>Seu carrinho está vazio.</h3>
                    </div>
                )
            }
        </div>

    )
}
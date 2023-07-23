'use client'

import { ProductContext } from "@/context/listProducts";
import Icon173Bin from "@/icons/Icon173Bin";
import Icon277Exit from "@/icons/Icon277Exit";
import IconCloseCircle from "@/icons/IconCloseCircle";
import IconHandbagFill from "@/icons/iconHandbagFill";
import IconHeart from "@/icons/iconHeart";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js"
import IconCircleUser from "@/icons/IconCircleUser";



export function Header() {
    const { status, data } = useSession();

    const [menuCheckout, setmenuCheckout] = useState(false)
    const { listProducts, addProducts } = useContext(ProductContext)

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


    const newList = listProducts.map((ele) => {
        return ele.data.product.price
    })

    const value = newList.reduce((acc, item) => acc + item, 0)
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency'
    }).format(value)





    return (
        <header className="fixed top-0 bg-white z-10 w-full shadow-lg shadow-zinc-500/25">
            <div className="container border-b-slate-900 border-solid mx-auto flex justify-between  items-center p-5">
                <div>
                    <Link href='/'>
                        <Image src="https://weblearnbd.net/tphtml/shofy-prv/shofy/assets/img/logo/logo.svg" width={135} height={35} alt="" />
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 border-gray-600 border rounded-full flex justify-center items-center">

                            {
                                status === 'authenticated' && data.user ?
                                    <Image className="rounded-full" src={data.user?.image!} width={30} height={30} alt={data.user?.name!} />
                                    :
                                    <IconCircleUser className="text-slate-600" width={30} height={30} />
                            }

                        </div>
                        {
                            status === 'unauthenticated' ?
                                <button className="text-primary text-sm font-semibold" onClick={() => signIn()}>
                                    Login
                                </button> :
                                <div>
                                    <span className="font-bold text-sm text-slate-500">Bem vindo(a)</span>
                                    <h3 className="font-bold text-lg text-slate-900">{data?.user?.name!}</h3>
                                </div>
                        }
                    </div>
                    <div className="flex items-center gap-4">

                        <Link href='/my-favorites'>
                            <IconHeart width={25} height={25} />
                        </Link>
                        <button onClick={() => setmenuCheckout(true)} className="relative">
                            <IconHandbagFill width={25} height={25} />

                            {
                                listProducts.length > 0 &&
                                <span className="absolute w-5 h-5 text-white font-bold flex justify-center text-xs items-center rounded-full bg-[#fd4b6b] -top-1 -right-2">
                                    {listProducts.length}
                                </span>
                            }


                        </button>
                        {
                            status === 'authenticated' && <button onClick={() => signOut()}> <Icon277Exit width={25} height={25} /> </button>
                        }
                    </div>
                </div>


                {
                    menuCheckout && (
                        <div className="absolute w-[400px]  top-20 rounded-lg  right-0 bg-white z-10 shadow-2xl">
                            <div className="flex justify-between items-center p-4">
                                <span className="text-lg text-slate-900 font-bold">SHOPPING CART</span>


                                <IconCloseCircle className="cursor-pointer" width={24} height={24} onClick={() => setmenuCheckout(!menuCheckout)} />

                            </div>

                            <div className="border-t-slate-700 border border-solid">

                                {
                                    listProducts.map((product) => {
                                        return (
                                            <div className="flex justify-between items-start p-3" key={product.data.product.id}>
                                                <div className="flex flex-col items-baseline gap-2">
                                                    <Image src={product.data.product.image} width={100} height={100} alt="" />
                                                    {/* <h2 className="text-base text-slate-900 font-bold">{product.data.product.name}</h2> */}
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
                                                        <Icon173Bin width={16} height={16} />
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
                                            <span className="font-bold text-xl text-slate-800">{formattedValue}</span>
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
            </div>

        </header>
    )
}
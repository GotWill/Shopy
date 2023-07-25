'use client'

import { ProductContext } from "@/context/listProducts";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { DoorOpen, Heart, List, Menu, ShoppingBag, UserCircle2 } from "lucide-react";
import logo from '../assets/img/logo.svg'
import { ShoppingCart } from "./shoppingCart";
import { MenuMobol } from "./menuMobol";



export function Header() {
    const { status, data } = useSession();

    const [menuCheckout, setmenuCheckout] = useState(false)
    const [menuMobol, setMenuMobol] = useState(false)

    const { listProducts } = useContext(ProductContext)
    return (
        <header className="fixed top-0 bg-white z-10 w-full shadow-lg shadow-zinc-500/25">
            <div className="container  mx-auto flex justify-between  items-center p-5">
                <div>
                    <Link href='/'>
                        <Image src={logo} width={135} height={35} alt="" />
                    </Link>
                </div>

                <div className="flex items-center gap-5 md:hidden">
                    <button title="Carinho de compras" onClick={() => setmenuCheckout(true)} className="relative">
                        <ShoppingBag width={25} height={25} />

                        {
                            listProducts.length > 0 &&
                            <span className="absolute w-5 h-5 text-white font-bold flex justify-center text-xs items-center rounded-full bg-[#fd4b6b] -top-1 -right-2">
                                {listProducts.length}
                            </span>
                        }


                    </button>
                    <button onClick={() => setMenuMobol(true)}>
                        <Menu width={25} height={25} />


                    </button>
                    {
                        menuMobol && <MenuMobol open={menuMobol} closeDialog={() => setMenuMobol(false)} />
                    }
                    <div className="w-14 h-14 border-gray-600 border rounded-full flex justify-center items-center md:hidden">

                        {
                            status === 'authenticated' && data.user ?
                                <Image className="rounded-full" src={data.user?.image!} width={30} height={30} alt={data.user?.name!} />
                                :
                                <UserCircle2 className="text-slate-600" width={30} height={30} />
                        }

                    </div>
                </div>

                <div className="hidden items-center gap-5 md:flex">
                    <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 border-gray-600 border rounded-full flex justify-center items-center">

                            {
                                status === 'authenticated' && data.user ?
                                    <Image className="rounded-full" src={data.user?.image!} width={30} height={30} alt={data.user?.name!} />
                                    :
                                    <UserCircle2 className="text-slate-600" width={30} height={30} />
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

                        <Link href='/my-favorites' title="Meus favoritos">
                            <Heart width={25} height={25} />
                        </Link>
                        <button title="Carinho de compras" onClick={() => setmenuCheckout(true)} className="relative">
                            <ShoppingBag width={25} height={25} />

                            {
                                listProducts.length > 0 &&
                                <span className="absolute w-5 h-5 text-white font-bold flex justify-center text-xs items-center rounded-full bg-[#fd4b6b] -top-1 -right-2">
                                    {listProducts.length}
                                </span>
                            }


                        </button>
                        <Link href='/my-requests' title="Meus pedidos">
                            <List width={25} height={25} />
                        </Link>
                        {
                            status === 'authenticated' && <button title="Sair" onClick={() => signOut()}> <DoorOpen width={25} height={25} /> </button>
                        }
                    </div>
                </div>


                {
                    menuCheckout && <ShoppingCart closeDialog={() => setmenuCheckout(false)} open={menuCheckout} />
                }
            </div>


        </header>
    )
}
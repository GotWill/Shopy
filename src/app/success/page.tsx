'use client'


import { BadgeCheck } from "lucide-react";
import { useSession } from "next-auth/react"
import Link from "next/link"

function Success() {

    const { data, status } = useSession();
   

    return (
        <div className="container mx-auto flex justify-center items-center mt-36 px-5 md:px-0">

            <div className="shadow-2xl p-8 flex flex-col justify-center items-center gap-4">

                <div className="w-24 h-24 bg-green-700 rounded-full flex justify-center items-center">
                    <BadgeCheck color="#FFF" width={50} height={50} />
                </div>

                <h2 className="font-bold text-slate-900 text-base">
                    Prezado(a) <strong className="text-[#0989ff]">{data?.user?.name}</strong>
                </h2>
                <p className="text-slate-800  font-medium leading-snug text-base md:max-w-md">
                    Obrigado por escolher nossa loja! Sua compra foi realizada com sucesso.<br></br>
                    Em breve, você receberá um e-mail com os detalhes da sua compra, incluindo o número do pedido e informações de entrega.<br></br>
                    Em caso de dúvidas, estamos à disposição para ajudar.<br></br>


                </p>

                <Link  href="/my-requests" className="bg-[#0989ff] text-white p-2 rounded-md font-bold w-full text-center">
                    Ver Meus pedidos
                </Link>
            </div>


        </div>
    )
}

export default Success
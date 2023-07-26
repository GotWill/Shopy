'use client'

import { CardItem } from "@/components/CardItem";
import { Prisma } from "@prisma/client";
import {  useSession } from "next-auth/react"
import { useEffect, useState } from "react"



export default  function MyRequest() {

    const { data } = useSession()




    const [requests, setRequests] = useState<
        Prisma.FavoritesGetPayload<{
            include: { Products: true };
        }>[]
    >([]);

    async function fetchFavorites() {
        const response = await fetch(`/api/user/requests/${(data?.user as any)?.id}`)
        const json = await response.json()
        setRequests(json)
    }


    useEffect(() => {

        fetchFavorites()
    }, [])



    return (
        <div className="mt-36 container mx-auto px-4">

            {
                requests.length > 0 ?
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-3xl text-slate-900 mb-5">Meus Pedidos</h1>
                        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap">
                            {requests.map((favorite) => {
                                return (
                                    <CardItem  fecthFavorites={fetchFavorites} titleButton="Comprar Novamente"  buttonCancel={false} product={favorite.Products} key={favorite.id} />
                                )
                            })}
                        </div>
                    </div>

                    :

                    <div className="">
                        <h3 className="font-bold text-2xl text-slate-900 mb-5">Você não possui nenhum pedido.</h3>
                        
                    </div>
            }
        </div>
    )
}


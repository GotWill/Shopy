'use client'

import { CardItem } from "@/components/CardItem";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";



function MyFavorites() {

    const { status, data } = useSession()

    const router = useRouter()



    const [favorites, setFavorites] = useState<
        Prisma.FavoritesGetPayload<{
            include: { Products: true };
        }>[]
    >([]);

    async function fetchFavorites() {
        const response = await fetch(`/api/user/${(data?.user as any)?.id}/favorites`)
        const json = await response.json()
        setFavorites(json)
    }


    async function deleteItem(id: string) {

        const res = await fetch(`/api/products/favorite/${id}`, {
            method: 'DELETE',
        })


        if (!res.ok) {
            return toast.error('Ocorreu um erro ao remover dos favoritos')
        }


        toast.success('Produto removido com sucesso!')


    }

    useEffect(() => {

        fetchFavorites()
    }, [status])


    return (
        <div className="mt-4 container mx-auto px-4">

            {
                favorites.length > 0 ?
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-3xl text-slate-900 mb-5">Meus Favoritos</h1>
                        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap">
                            {favorites.map((favorite) => {
                                return (
                                    <CardItem  fecthFavorites={fetchFavorites} handleDeleteItem={() => deleteItem(favorite.id)} buttonCancel={true} product={favorite.Products} key={favorite.id} />
                                )
                            })}
                        </div>
                    </div>

                    :

                    <div className="">
                        <h3 className="font-bold text-2xl text-slate-900 mb-5">Voce Não possui Favoritos</h3>
                        <Link href="/" className="bg-[#0989ff] text-white p-2 rounded-md font-bold">
                            Adicionar Favoritos
                        </Link>
                    </div>
            }
        </div>
    )
}

export default MyFavorites
'use client'
import { CardItem } from "@/components/CardItem";
import { Products } from "@prisma/client";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Search(){

    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Products[]>([])

    useEffect(() => {
        async function fecthProducts(){
          const response =  await fetch(`/api/products/search?text=${searchParams.get("text") ?? ""}`)

          const data = await response.json()

          setProducts(data)
        }

        fecthProducts()
    },[])



    return (
        <div className="container mx-auto mt-36 px-2">
            <h1 className="font-bold text-xl text-slate-900">Produtos Encontrados</h1>

             <div className="flex flex-col gap-5 mt-5 md:flex-row">
                {
                   products.map((product) => {
                    return (
                        <CardItem key={product.id} product={product}/>
                    )
                   }) 
                }
             </div>
        </div>
    )
}
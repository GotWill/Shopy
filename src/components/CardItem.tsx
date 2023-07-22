import IconHeart from "@/icons/iconHeart";
import IconShoppingCart from "@/icons/iconShoppingCart";
import IconStar from "@/icons/iconStart";
import { Products } from "@prisma/client";
import Image from "next/image";
import { ButtonsCardsItem } from "./ButtonsCardItem";

interface CardItemProps {
    product: Products;
    buttonCancel?: boolean;
    handleDeleteItem?: (id: string) => void;
    fecthFavorites?: () => void;
}

export function CardItem({ product, buttonCancel, handleDeleteItem, fecthFavorites}: CardItemProps) {

    function handleClick() {
        if (handleDeleteItem) {
            handleDeleteItem('')
        }

        if (fecthFavorites) {
            fecthFavorites()
        }

    }

    

    return (
        <div className="border-solid border border-[#eaebed]  rounded-lg relative group ">
            <div className="flex justify-center items-center">
                <Image className="w-full md:w-[300px] h-[184px] rounded-sm" src={product.image} width={214} height={184} alt="" />

                <div className={`${product.badge === 'Oferta' ? 'bg-green-700' : 'bg-[#0989ff]'} absolute top-3 right-3 px-3 rounded-md`}>
                    <span className="text-white font-bold text-sm">{product.badge}</span>
                </div>
            </div>

            <div className="border-t-[#eaebed] p-5 border-solid border flex flex-col">
                <span className="text-base text-slate-500 font-medium">{product.category}</span>
                <h3 className="text-lg text-slate-900 font-bold">{product.name}</h3>
                <div className="my-1 flex items-center gap-1">
                    <IconStar color="#ffb21d" width={15} height={15} />
                    <IconStar color="#ffb21d" width={15} height={15} />
                    <IconStar color="#ffb21d" width={15} height={15} />
                    <IconStar color="#ffb21d" width={15} height={15} />
                    <IconStar color="#ffb21d" width={15} height={15} />
                </div>
                <span className="text-lg font-bold text-[#0989ff]">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>


                {
                    buttonCancel && <button onClick={handleClick} className="text-red-500 mt-3 border-red-500 border hover:bg-red-600 bg-transparent hover:text-white p-2 text-base rounded-xl">Remover dos Favoritos</button>
                }

            </div>


            <ButtonsCardsItem  product={product} />




        </div>
    )
}
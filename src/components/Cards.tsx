import { CircleDollarSign, Headphones, Percent, Truck } from "lucide-react";

export function Cards() {
    return (
        <section className="container mx-auto px-3 mt-5 flex flex-col gap-4 justify-center items-center md:flex-row max-[1230px]:flex-wrap">
            <div className="bg-[#f6f7f9] p-4 max-w-[350px] w-full flex gap-5">

                <Truck color="#fd4b6b" width={40} height={40} />

                <div className="flex flex-col">
                    <h4 className="font-bold text-base text-slate-900">Entrega grátis</h4>
                    <span className="font-medium text-base text-slate-500">Pedidos de todos os itens</span>
                </div>
            </div>

            <div className="bg-[#f6f7f9] p-4 max-w-[350px] w-full flex gap-5">

                <CircleDollarSign color="#fd4b6b" width={40} height={40} />

                <div className="flex flex-col">
                    <h4 className="font-bold text-base text-slate-900">Devolução e Reembolso</h4>
                    <span className="font-medium text-base text-slate-500">Garantia de devolução</span>
                </div>
            </div>

            <div className="bg-[#f6f7f9] p-4 max-w-[350px] w-full flex gap-5">
                <Percent color="#fd4b6b" width={40} height={40} />
                <div className="flex flex-col">
                    <h4 className="font-bold text-base text-slate-900">Desconto para membros</h4>
                    <span className="font-medium text-base text-slate-500">Em cada pedido</span>
                </div>
            </div>

            <div className="bg-[#f6f7f9] p-4 max-w-[350px] w-full flex gap-5">

                <Headphones color="#fd4b6b" width={40} height={40} />

                <div className="flex flex-col">
                    <h4 className="font-bold text-base text-slate-900">Support 24/7</h4>
                    <span className="font-medium text-base text-slate-500">Contacte-nos 24</span>
                </div>
            </div>
        </section>
    )
}
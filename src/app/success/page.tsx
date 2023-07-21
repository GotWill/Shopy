import IconCheckCircle from "@/icons/IconCheckCircle"
import Link from "next/link"

function Success() {
    return (
        <div className="container mx-auto flex justify-center items-center">

            <div className="shadow-2xl p-8 flex flex-col justify-center items-center gap-4">

                <div className="w-24 h-24 bg-green-700 rounded-full flex justify-center items-center">
                    <IconCheckCircle color="#FFF" width={50} height={50} />
                </div>

                <h2 className="font-bold text-slate-900 text-base">Obrigado por estar aqui. Sua presença é muito apreciada!</h2>

                <Link href="/" className="bg-[#0989ff] text-white p-2 rounded-md font-bold">
                    Ver Meus pedidos
                </Link>
            </div>


        </div>
    )
}

export default Success
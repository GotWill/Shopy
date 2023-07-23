import Image from "next/image";

export function Topics(){
    return (
        <section className="container mx-auto my-10 gap-8 flex flex-col items-center md:flex-row md:justify-center md:flex-wrap md:gap-12">
            <div className="flex flex-col items-center">
                <div className="w-44 h-44 rounded-full bg-[#BDDEFF] flex items-center justify-center">
                    <a href="/search?text=fone" className="hover:animate-pulse">
                    <Image src="https://weblearnbd.net/tphtml/shofy-prv/shofy/assets/img/product/category/product-cat-1.png" width={76} height={98} alt="" />
                    </a>
                </div>

                <div className="flex flex-col items-center mt-3">
                    <a href="/search?text=fone" className="font-bold text-lg text-slate-900 hover:text-[#0989ff]">Headphones</a>
                    <span className="font-bold text-base text-slate-600">20 produtos</span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-44 h-44 rounded-full bg-[#BDDEFF] flex items-center justify-center">
                    <a href="/search?text=iphone" className="hover:animate-pulse">
                      <Image src="https://weblearnbd.net/tphtml/shofy-prv/shofy/assets/img/product/category/product-cat-2.png" width={76} height={98} alt="" />
                    </a>
                </div>

                <div className="flex flex-col items-center mt-3">
                    <a href="/search?text=iphone" className="font-bold text-lg text-slate-900 hover:text-[#0989ff]">Mobile Phone</a>
                    <span className="font-bold text-base text-slate-600">25 produtos</span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-44 h-44 rounded-full bg-[#BDDEFF] flex items-center justify-center">
                    <a href="/search?text=relógio" className="hover:animate-pulse">
                     <Image src="https://weblearnbd.net/tphtml/shofy-prv/shofy/assets/img/product/category/product-cat-4.png" width={76} height={98} alt="" />
                    </a>
                </div>

                <div className="flex flex-col items-center mt-3">
                    <a href="/search?text=relógio" className="font-bold text-lg text-slate-900 hover:text-[#0989ff]">Smartwatch</a>
                    <span className="font-bold text-base text-slate-600">20 produtos</span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-44 h-44 rounded-full bg-[#BDDEFF] flex items-center justify-center">

                    <a href="#" className="hover:animate-pulse">
                      <Image src="https://weblearnbd.net/tphtml/shofy-prv/shofy/assets/img/product/category/product-cat-5.png" width={76} height={98} alt="" />
                    </a>

                </div>

                <div className="flex flex-col items-center mt-3">
                    <a href="" className="font-bold text-lg text-slate-900 hover:text-[#0989ff]">With Bluetooth</a>
                    <span className="font-bold text-base text-slate-600">15 produtos</span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-44 h-44 rounded-full bg-[#BDDEFF] flex items-center justify-center">
                    <a href="#" className="hover:animate-pulse">
                       <Image  src="https://weblearnbd.net/tphtml/shofy-prv/shofy/assets/img/product/category/product-cat-1.png" width={76} height={98} alt="" />
                    </a>
                </div>

                <div className="flex flex-col items-center mt-3">
                    <a href="#" className="font-bold text-lg text-slate-900 hover:text-[#0989ff]">Headphones</a>
                    <span className="font-bold text-base text-slate-600">20 produtos</span>
                </div>
                

            </div>
        </section>
    )
}
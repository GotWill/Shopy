'use client'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import sliderImg from '../assets/img/slider.webp'
import iphone from '../assets/img/iphone.png'
import shape from '../assets/img/shape.webp'


export function Slider() {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (

        <div className="relative mt-24">
            <div ref={sliderRef} className="keen-slider">
                <div className="keen-slider__slide bg-[#115061]  max-h-screen">
                    <div className="container mx-auto p-4 flex flex-col gap-10 md:flex-row md:justify-around md:items-center md:p-0 md:h-[400px] h-full  text-white">
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-base">Preço  <b>$450.00</b></span>
                            <h3 className="font-bold text-4xl max-w-md mb-2 md:text-5xl">A melhor coleção de Smartwatch 2023</h3>
                            <p className="font-medium text-base">Oferta exclusiva <span className="text-[#ffd43a]">-10%
                            </span></p>
                            <Link href="/search?text=relógio" className="bg-white text-[#010f1c] py-2 px-6 rounded-lg font-medium text-base hover:bg-transparent hover:border hover:border-x-white hover:text-white transition duration-700 ease-in-out">
                                Compre agora
                            </Link>
                        </div>
                        <div>
                            <Image  src={sliderImg} width={320} height={250} alt="" />

                            <div className="absolute top-0 right-0 -z-10 opacity-10">
                                <Image src={shape} width={320} height={250} alt="" />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="keen-slider__slide bg-[#115061]  max-h-screen">
                    <div className="container mx-auto p-4 flex flex-col gap-10 md:flex-row md:justify-around md:items-center md:p-0 md:h-[400px] h-full  text-white">
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-base">Preço apartir de  <b>$3.500.00</b></span>
                            <h3 className="font-bold text-4xl max-w-md mb-2 md:text-5xl">A melhor coleção de Iphone 2023</h3>
                            <p className="font-medium text-base">Oferta exclusiva <span className="text-[#ffd43a]">-10%
                            </span></p>
                            <Link href="/search?text=iphone" className="bg-white text-[#010f1c] py-2 px-6 rounded-lg font-medium text-base hover:bg-transparent hover:border hover:border-x-white hover:text-white transition duration-700 ease-in-out">
                                Compre agora
                            </Link>
                        </div>
                        <div>
                            <Image  src={iphone} width={320} height={250} alt="" />

                            <div className="absolute top-0 right-0 -z-10 opacity-10">
                                <Image src={shape} width={320} height={250} alt="" />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                    />
                </>
            )}
        </div>


    )
}




function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabeld = props.disabled ? "fill-[#ffffff80]" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`w-7 h-7 absolute top-1/2  cursor-pointer translate-y-[-50%] fill-white ${props.left ? "left-2" : "left-auto right-2"
                } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}
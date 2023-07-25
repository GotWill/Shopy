import { ArrowRightCircle, DoorOpen, Heart, List, XCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface MenuMobolProps {
    open: boolean;
    closeDialog: () => void;
}

export function MenuMobol({closeDialog, open} : MenuMobolProps) {
    const { status} = useSession();

    return (
        <div className="absolute bg-white top-0 right-0 w-[300px] h-screen z-30 shadow-lg shadow-zinc-500/25">
            <div className="mt-10">
                <div className="flex justify-end px-5 pb-2 border-b border-slate-800 border-1">
                        <XCircle onClick={closeDialog} className="cursor-pointer" width={24} height={24} />
                </div>

                <div className="flex flex-col">

                    {
                        status === 'unauthenticated' &&
                        <div className="flex gap-5 mt-3 px-3 items-center">

                            <button onClick={() => signIn()}>
                                Login
                            </button>

                            <ArrowRightCircle width={25} height={25} />
                        </div>
                    }

                    <div className="flex gap-5 mt-3 px-3 items-center">
                        <Link href="/my-favorites">
                            Meus favoritos
                        </Link>

                        <Heart width={24} height={24} />
                    </div>

                    <div className="flex gap-5 mt-3 px-3 items-center">
                        <Link href="my-requests">
                            Meus Pedidos
                        </Link>

                        <List width={25} height={25} />
                    </div>

                    {
                        status === 'authenticated' &&
                        <div className="flex gap-5 mt-3 px-3 items-center">
                            <button onClick={() => signOut()}>
                                Sair
                            </button>

                            <DoorOpen width={25} height={25} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
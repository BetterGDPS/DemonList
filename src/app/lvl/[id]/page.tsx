"use client"

import toast from "react-hot-toast"
import { demons } from "../../components/demon"
import Image from "next/image"

type Props = {
    params: {
      id: string
    }
}

export default function Level({ params: { id } }: Props) {
    const demon = demons.find(d => String(d.id) === id);
    
    if (!demon) {
        return <div className="flex justify-center items-center mt-20">Демон не найден</div>;
    }

    const { name, author, place, url, lvl, obj, lenght, verifed, release } = demon;

    return (
        <div className="flex justify-center items-center">
            <div className="mt-20 w-[1000px] bg-main-darklight rounded-xl shadow-2xl p-10">
                <span className="flex flex-col justify-center items-center flex-1">
                    <span className="flex flex-row items-end">
                        <h1 className="text-7xl">#{place}</h1>
                        <p className="text-3xl mx-3 mb-2">{name}</p>
                    </span>
                    <p className="text-white/70 text-xl">by {author}</p>
                </span>
                <Image
                    src={`https://img.youtube.com/vi/${url}/hqdefault.jpg`}
                    alt={name}
                    width={500}
                    height={200}
                    className="mx-auto aspect-video object-cover rounded-xl mt-4 shadow-2xl"
                    priority
                />
                <section className="flex flex-col items-center mt-6 w-full">
                    <div className="border-gray-400 border-2 rounded-lg w-48 sm:w-60 h-16 text-center flex flex-col items-center justify-center mb-4">
                        <span className="text-lg">ID</span>
                        <span className="text-sm text-blue-400 hover:text-blue-500 hover:cursor-pointer" onClick={() => {
                            navigator.clipboard.writeText((lvl || 0).toString())
                            toast.success("ID copied to clipboard", {
                                style: {
                                    color: '#778DA9',
                                    background: '#1B263B',
                                },
                                iconTheme: {
                                    primary: '#778DA9',
                                    secondary: '#FFFAEE',
                                },
                            })
                        }}>{lvl}</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xs sm:max-w-md">
                        <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
                            <span className="text-lg">Lenght</span>
                            <span>{lenght}</span>
                        </li>
                        <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
                            <span className="text-lg">Object</span>
                            <span>{obj}</span>
                        </li>
                        <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
                            <span className="text-lg">Verifed by</span>
                            <span>{verifed}</span>
                        </li>
                        <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
                            <span className="text-lg">Release</span>
                            <span>{release}</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

"use client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getLevelById, Demon } from "../../components/api/levels";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default function Level({ params: { id } }: Props) {
  const [demon, setDemon] = useState<Demon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemon = async () => {
      try {
        const demonId = Number(id);
        if (isNaN(demonId)) throw new Error("Invalid ID");
        
        const foundDemon = await getLevelById(demonId);
        setDemon(foundDemon);
      } catch (error) {
        console.error("Error loading demon:", error);
        toast.error("Failed to load demon data", {
          style: {
            color: '#7C7C7C',
            background: '#252525',
          },
          iconTheme: {
            primary: '#404040',
            secondary: '#7C7C7C',
          },
        });
        setDemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDemon();
  }, [id]);

  const copyToClipboard = (text: string, successMessage: string) => {
    navigator.clipboard.writeText(text);
    toast.success(successMessage, {
      style: {
        color: '#7C7C7C',
        background: '#252525',
      },
      iconTheme: {
        primary: '#404040',
        secondary: '#7C7C7C',
      },
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 className="animate-spin h-20 w-20 text-main-light" />
      </div>
    );
  }

  if (!demon) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="text-2xl">Demon not found</div>
      </div>
    );
  }

  const { name, author, place, _id: lvl, song, obj, lenght, verifed, release, unlisted, list } = demon;

  return (
    <div className="flex justify-center items-center">
      <title>{`${name}`}</title>
      <div className="mt-28 w-[1000px] bg-main-darklight rounded-xl shadow-2xl p-10">
        <span className="flex flex-col justify-center items-center flex-1">
          <span className="flex flex-row items-end">
            <p className="text-3xl mx-3 mb-2">#{place} {name}</p>
          </span>
          <p className="text-white/70 text-lg">{list} list</p>
          <p className="text-white/70 text-xl">by {author}</p>
        </span>
        <div className="flex justify-center items-center relative">
            {demon.url?.startsWith('/') ? (
            <div className="relative w-full max-w-[500px] aspect-video mt-4 rounded-xl shadow-2xl bg-main-darklight flex items-center justify-center overflow-hidden">
              <Image
                src="/empty.png"
                alt="Background"
                fill
                className="object-cover opacity-30"
                priority
              />
              <p className="text-main-lightlight text-3xl font-bold text-center p-4 drop-shadow-xl relative z-10">
                {name}
              </p>
            </div>
            ) : (
            <div className="w-full max-w-[640px] aspect-video mt-4 rounded-xl shadow-2xl overflow-hidden">
              <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${demon.url}`}
              title={name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              />
            </div>
            )}
        </div>
        <section className="flex flex-col items-center mt-6 w-full">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xs sm:max-w-md">
            <li 
              className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center hover:bg-gray-400/10 transition-colors cursor-pointer"
              onClick={() => copyToClipboard((lvl || 0).toString(), "ID copied to clipboard")}
            >
              <span className="text-lg">ID</span>
              <span className="text-sm text-blue-300 hover:underline">{lvl}</span>
            </li>
            <li 
              className={`border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center ${
                song !== 0 ? 'hover:bg-gray-400/10 transition-colors cursor-pointer' : 'opacity-100'
              }`}
              onClick={song !== 0 ? () => copyToClipboard(song.toString(), "Song ID copied to clipboard") : undefined}
            >
              <span className="text-lg">Song ID</span>
              <span className="text-sm text-blue-300 hover:underline">{song === 0 ? '-' : song}</span>
            </li>
            <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
              <span className="text-lg">Lenght</span>
              <span className="text-sm">{lenght}</span>
            </li>
            <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
              <span className="text-lg">Object</span>
              <span className="text-sm">{obj}</span>
            </li>
            <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
              <span className="text-lg">Verifed</span>
              <span className="text-sm">{unlisted ? '-' : verifed}</span>
            </li>
            <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
              <span className="text-lg">Release</span>
              <span className="text-sm">{release}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
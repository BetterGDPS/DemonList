"use client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getLevelById, Demon } from "../../components/levels";
import Image from "next/image";
import { Loader2 } from "lucide-react";

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
            color: '#778DA9',
            background: '#1B263B',
          },
          iconTheme: {
            primary: '#778DA9',
            secondary: '#1B263B',
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
        color: '#778DA9',
        background: '#1B263B',
      },
      iconTheme: {
        primary: '#778DA9',
        secondary: '#1B263B',
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

  const { name, author, place, _id: lvl, song, obj, lenght, verifed, release, unlisted } = demon;

  return (
    <div className="flex justify-center items-center">
      <div className="mt-28 w-[1000px] bg-main-darklight rounded-xl shadow-2xl p-10">
        <span className="flex flex-col justify-center items-center flex-1">
          <span className="flex flex-row items-end">
            {!unlisted && place && (
              <h1 className="text-7xl">#{place}</h1>
            )}
            <p className="text-3xl mx-3 mb-2">{name}</p>
          </span>
          <p className="text-white/70 text-xl">by {author}</p>
        </span>
        <div className="flex justify-center items-center relative">
          <a 
            href={demon.url?.startsWith('/') ? '#' : `https://youtu.be/${demon.url}`}
            target={demon.url?.startsWith('/') ? '' : '_blank'}
            rel="noopener noreferrer"
            className={`${demon.url?.startsWith('/') && 'hover:cursor-default'}`}
          >
            <Image
              src={
                demon.url?.startsWith('/') 
                ? demon.url
                : `https://img.youtube.com/vi/${demon.url}/hqdefault.jpg`
              }
              alt={name}
              width={500}
              height={200}
              className={`aspect-video object-cover rounded-xl mt-4 shadow-2xl ${!demon.url?.startsWith('/') && 'hover:scale-105'} transition-transform`}
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/empty.png';
              }}
            />
            <p className="text-center mt-4 hover:text-white/80 hover:underline">showcase</p>
            {demon.url?.startsWith('/') && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl mt-4 ">
                <p className="text-logo-blue text-3xl font-bold text-center p-4 drop-shadow-xl">
                  {name}
                </p>
              </div>
            )}
          </a>
        </div>
        <section className="flex flex-col items-center mt-6 w-full">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xs sm:max-w-md">
            <li 
              className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center hover:bg-gray-400/10 transition-colors cursor-pointer"
              onClick={() => copyToClipboard((lvl || 0).toString(), "ID copied to clipboard")}
            >
              <span className="text-lg">ID</span>
              <span className="text-sm">{lvl}</span>
            </li>
            <li 
              className={`border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center ${
                song !== 0 ? 'hover:bg-gray-400/10 transition-colors cursor-pointer' : 'opacity-100'
              }`}
              onClick={song !== 0 ? () => copyToClipboard(song.toString(), "Song ID copied to clipboard") : undefined}
            >
              <span className="text-lg">Song ID</span>
              <span className="text-sm">{song === 0 ? '-' : song}</span>
            </li>
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
              <span>{unlisted ? '-' : verifed}</span>
            </li>
            <li className="border-gray-400 border-2 rounded-lg h-16 flex flex-col items-center justify-center text-center">
              <span className="text-lg">Release</span>
              <span>{release}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
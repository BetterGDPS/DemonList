"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export type DemonCardProps = {
  id: string | number;
  name: string;
  place?: number;
  author: string;
  url: string;
  unlisted?: boolean;
};

export default function Card({ id, name, place, author, url }: DemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/level/${id}`);
  };
  
  return (
    <div
      className="flex lg:flex-row flex-col items-center bg-main-darklight p-4 w-full max-w-screen-lg rounded-sm cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-main-darklight/80 px-2 shadow-2xl"
      onClick={handleClick}
    >
      <div className="m-2 rounded-md overflow-hidden mt-4 w-full max-w-[300px] h-[150px] md:max-w-[400px] md:h-[200px] relative">
        <Image
          src={url.startsWith('/') ? url : `https://img.youtube.com/vi/${url}/hqdefault.jpg`}
          alt={name}
          width={400}
          height={200}
          className="object-cover w-full h-full shadow-2xl lg:mt-0 border-[2px] border-main-light/30"
          priority
        />
        {url.startsWith('/') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-logo-blue text-2xl md:text-3xl font-bold text-center p-2 drop-shadow-xl">
              {name}
            </p>
          </div>
        )}
      </div>
      <span className="flex flex-col justify-center items-center lg:items-start flex-1 pl-0 lg:pl-8 w-full">
        <span className="flex flex-col lg:flex-row lg:items-end w-full">
          <p className={`text-2xl md:text-3xl mb-2 text-center lg:text-left w-full lg:w-auto`}>
            #{place} {name}
          </p>
        </span>
        <p className="text-white/70 text-sm md:text-lg text-center lg:text-left w-full lg:w-auto">by {author}</p>
      </span>
    </div>
  );
}
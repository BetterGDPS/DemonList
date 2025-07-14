"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export type DemonCardProps = {
  id: string | number;
  name: string;
  place: number;
  author: string;
  url: string;
};

export default function Card({ id, name, place, author, url }: DemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lvl/${id}`);
  };

  return (
    <div
      className="flex lg:flex-row flex-col items-center bg-main-darklight lg:h-80 h-[400px] w-full max-w-screen-lg rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-main-darklight/80 px-2 shadow-2xl"
      onClick={handleClick}
    >
      <div className="m-2 rounded-xl overflow-hidden mt-4" style={{ width: "400px", height: "200px", maxWidth: "400px", maxHeight: "200px" }}>
        <Image
          src={`https://img.youtube.com/vi/${url}/hqdefault.jpg`}
          alt={name}
          width={400}
          height={200}
          className="object-cover w-full h-full shadow-2xl lg:mt-0 "
          priority
        />      
      </div>
      <span className="flex flex-col justify-center items-center lg:items-start flex-1 pl-0 lg:pl-8 w-full">
        <span className="flex flex-col lg:flex-row items-center lg:items-end w-full">
          <h1 className="text-7xl text-center lg:text-left w-full lg:w-auto">#{place}</h1>
          <p className="text-3xl mx-0 lg:mx-3 mb-2 text-center lg:text-left w-full lg:w-auto">{name}</p>
        </span>
        <p className="text-white/70 text-xl text-center lg:text-left w-full lg:w-auto">by {author}</p>
      </span>
    </div>
  );
}
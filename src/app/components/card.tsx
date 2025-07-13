"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export type DemonCardProps = {
  id: string | number;
  name: string;
  place: number;
  author: string;
  img: string;
};

export default function Card({ id, name, place, author, img }: DemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lvl/${id}`);
  };

  return (
    <div
      className="flex flex-row bg-main-darklight h-80 w-full max-w-screen-lg rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-main-darklight/80"
      onClick={handleClick}
    >
      <Image
        src={img}
        alt="Card Image"
        width={400}
        height={200}
        className="rounded-xl m-2 object-cover"
        style={{ maxWidth: "400px", maxHeight: "200px" }}
      />
      <span className="flex flex-col justify-center items-start flex-1 pl-8">
        <span className="flex flex-row items-end">
          <h1 className="text-7xl">#{place}</h1>
          <p className="text-3xl mx-3 mb-2">{name}</p>
        </span>
        <p className="text-white/70 text-xl">by {author}</p>
      </span>
    </div>
  );
}

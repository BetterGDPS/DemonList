import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-row items-center justify-center mt-24">
      <Image src="/404.png" alt="Logo" width={500} height={500} className="" />
      <div>
        <h1 className="text-7xl font-bold">404</h1>
        <p className="text-2xl text-center">Not Found</p>
      </div>
    </main>
  );
};
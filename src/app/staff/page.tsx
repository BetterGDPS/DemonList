import Image from 'next/image';

export default function page() {
  return (
    <div className="flex flex-col py-8 px-2 sm:px-4 lg:px-8 items-center mt-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch w-full">
          <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-12 px-8 bg-main-dark w-full max-w-[420px] items-center">
            <div className="flex justify-center pt-2">
              <div className="relative w-52 h-52">
                <Image
                  src="/staff/brokkolya.png"
                  alt="Brokkolya4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">Brokkolya</h3>
              <p className="text-main-lightlight text-xl">
                BGDPS Owner
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-12 px-8 bg-main-dark w-full max-w-[420px] items-center">
            <div className="flex justify-center pt-2">
              <div className="relative w-52 h-52">
                <Image
                  src="/staff/kenyka.png"
                  alt="Kenyka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">Kenyka</h3>
              <p className="text-main-lightlight text-xl">
                GlobalList Developer
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-12 px-8 bg-main-dark w-full max-w-[420px] items-center">
            <div className="flex justify-center pt-2">
              <div className="relative w-52 h-52">
                <Image
                  src="/staff/troil.png"
                  alt="Troil"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">Troil</h3>
              <p className="text-main-lightlight text-xl">
                GlobalList Owner
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-12 px-8 bg-main-dark w-full max-w-[420px] items-center">
            <div className="flex justify-center pt-2">
              <div className="relative w-52 h-52">
                <Image
                  src="/staff/drsdz.png"
                  alt="drsdz"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">Drsdz</h3>
              <p className="text-main-lightlight text-xl">
                Exposer
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-12 px-8 bg-main-dark w-full max-w-[420px] items-center">
            <div className="flex justify-center pt-2">
              <div className="relative w-52 h-52">
                <Image
                  src="/staff/holeks.png"
                  alt="holeks"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">Holeks</h3>
              <p className="text-main-lightlight text-xl">
                Analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
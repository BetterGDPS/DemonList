import Image from 'next/image';

export default function page() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] py-8 px-2 sm:px-4 lg:px-8 justify-center">
      <div className="max-w-7xl mx-auto w-full flex-grow flex items-center justify-center">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-stretch">
            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6 px-5 bg-[#232a3a] w-full">
              <div className="flex justify-center pt-2">
                <div className="relative w-32 h-32">
                  <Image
                    src="/staff/brokkolya.png"
                    alt="Brokkolya4"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Brokkolya</h3>
                <p className="text-gray-600 text-base">
                  BGDPS Owner
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6 px-5 bg-[#232a3a] w-full">
              <div className="flex justify-center pt-2">
                <div className="relative w-32 h-32">
                  <Image
                    src="/staff/kenyka.png"
                    alt="Kenyka"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Kenyka</h3>
                <p className="text-gray-600 text-base">
                  Demonlist Developer
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6 px-5 bg-[#232a3a] w-full">
              <div className="flex justify-center pt-2">
                <div className="relative w-32 h-32">
                  <Image
                    src="/staff/troil.png"
                    alt="Troil"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Troil</h3>
                <p className="text-gray-600 text-base">
                  Demonlist Owner
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6 px-5 bg-[#232a3a] w-full">
              <div className="flex justify-center pt-2">
                <div className="relative w-32 h-32">
                  <Image
                    src="/staff/drsdz.png"
                    alt="drsdz"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Drsdz</h3>
                <p className="text-gray-600 text-base">
                  Exposurer
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6 px-5 bg-[#232a3a] w-full">
              <div className="flex justify-center pt-2">
                <div className="relative w-32 h-32">
                  <Image
                    src="/staff/holeks.png"
                    alt="holeks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold mb-1">Holeks</h3>
                <p className="text-gray-600 text-base">
                  Analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
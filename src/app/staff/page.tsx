import Image from 'next/image';

export default function page() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 lg:px-8 mt-32 md:mt-0">
      <div className="max-w-7xl mx-auto w-full flex-grow flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6">
              <div className="flex justify-center pt-4">
                <div className="relative w-24 h-24">
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
                <h3 className="text-lg font-bold mb-1">Brokkolya</h3>
                <p className="text-gray-600 text-sm">
                  BGDPS Owner
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6">
              <div className="flex justify-center pt-4">
                <div className="relative w-24 h-24">
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
                <h3 className="text-lg font-bold mb-1">Kenyka</h3>
                <p className="text-gray-600 text-sm">
                  Demonlist Developer
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6">
              <div className="flex justify-center pt-4">
                <div className="relative w-24 h-24">
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
                <h3 className="text-lg font-bold mb-1">Troil</h3>
                <p className="text-gray-600 text-sm">
                  Demonlist Administrator
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg overflow-hidden shadow-md border-2 border-main-light hover:border-main-darklight transition-all duration-300 h-full py-6">
              <div className="flex justify-center pt-4">
                <div className="relative w-24 h-24">
                  <Image
                    src="/staff/dimka.png"
                    alt="Dimkaday"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold mb-1">Oery</h3>
                <p className="text-gray-600 text-sm">
                  Demonlist Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
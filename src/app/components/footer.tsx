export default function Footer() {
    return (
        <div className="bg-main-dark p-4 w-full mt-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl">
                    <span className="text-logo-green">B</span>
                    <span className="text-logo-blue">GDPS</span>
                </h1>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-main-lightlight text-sm sm:text-base">
                    <a href="https://bgdps.ru" className="hover:underline px-2 py-1 sm:px-0 sm:py-0" target="_blank">bgdps.ru</a>
                </div>
            </div>

            <hr className="border-t-2 border-main-lightlight my-2" />

            <div className="text-main-lightlight text-center text-sm sm:text-base">
                <h1>BGDPS 2025</h1>
                <a className="text-xs sm:text-sm hover:underline" href="/staff">Demonlist staff</a>
            </div>
        </div>
    )
}
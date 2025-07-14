export default function Footer() {
    return (
        <div className="bg-main-dark p-4 w-full mt-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl">
                    <span className="text-logo-green">B</span>
                    <span className="text-logo-blue">GDPS</span>
                </h1>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-main-light text-sm sm:text-base">
                    <a href="https://discord.gg/KCbGSn79ka" className="hover:underline px-2 py-1 sm:px-0 sm:py-0" target="_blank">discord</a>
                    <a href="https://www.tiktok.com/@.bgdps?_t=ZM-8xzZto8ZwnA&_r=1" className="hover:underline px-2 py-1 sm:px-0 sm:py-0" target="_blank">tiktok</a>
                    <a href="https://youtube.com/@betterbgdps?si=NqEB5e8DTvjfNYlg" className="hover:underline px-2 py-1 sm:px-0 sm:py-0" target="_blank">youtube</a>
                    <a href="https://bettergdps.ps.fhgdps.com/dashboard/" className="hover:underline px-2 py-1 sm:px-0 sm:py-0" target="_blank">dashboard</a>
                </div>
            </div>

            <hr className="border-t-2 border-main-darklight my-4" />

            <div className="text-main-darklight text-center text-sm sm:text-base">
                <h1>BGDPS 2025 by <a href="https://github.com/brokkolya4" target="_blank" className="hover:underline">Brokkolya</a></h1>
                <h1 className="text-xs sm:text-sm">Site developed by <a href="https://thekeny.ru" target="_blank" className="hover:underline">Kenyka</a></h1>
            </div>
        </div>
    )
}
export default function Footer() {
    return (
        <div className="bg-main-dark p-4 w-full mt-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl">
                    <span className="text-logo-green">B</span>
                    <span className="text-logo-blue">GDPS</span>
                </h1>
                <div className="flex gap-4 text-main-light">
                    <a href="https://discord.gg/KCbGSn79ka" className="hover:underline" target="_blank">discord</a>
                    <a href="https://www.tiktok.com/@.bgdps?_t=ZM-8xzZto8ZwnA&_r=1" className="hover:underline" target="_blank">tiktok</a>
                    <a href="https://youtube.com/@betterbgdps?si=NqEB5e8DTvjfNYlg" className="hover:underline" target="_blank">youtube</a>
                    <a href="https://bettergdps.ps.fhgdps.com/dashboard/" className="hover:underline" target="_blank">dashboard</a>
                </div>
            </div>

            <hr className="border-t-2 border-main-darklight my-4" />

            <div className="text-main-darklight text-center">
                <h1>BGDPS 2025 by <a href="https://github.com/brokkolya4" target="_blank" className="hover:underline">Brokkolya</a></h1>
                <h1 className="text-sm">Site developed by <a href="https://thekeny.ru" target="_blank" className="hover:underline">Kenyka</a></h1>
            </div>
        </div>
    )
}

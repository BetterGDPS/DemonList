import type { Metadata } from "next";
import { Krona_One } from "next/font/google";
import "./globals.css";
import Header from "./components/header"
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

const kronaOne = Krona_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-krona-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BGDPS DemonList",
  description: "Официальный топ уровней BGDPS",
  icons: {
    icon: "/icon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${kronaOne.variable} bg-main-bg min-h-screen flex flex-col`}>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

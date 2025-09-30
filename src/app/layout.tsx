import type { Metadata } from "next";
import { Geist, Geist_Mono, Fustat } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import Footer from "@/shared/components/layout/Footer";
import Providers from "./providers";
import I18nProvider from "@/shared/components/layout/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:  "VolunChain - Decentralized Volunteering",
  description:
    "A platform revolutionizing volunteer work with blockchain technology, connecting volunteers and organizations with transparency and efficiency.",
  keywords: "Volunteering, Blockchain, NFTs, Community, Charity",
  authors: [{ name: "Volunchain Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fustat.variable}`}
    >
      <head>
     <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col justify-between min-h-screen text-text-light overflow-x-hidden">
        <Providers>
          <I18nProvider>
            <main className="flex-grow">{children}</main>
            <Footer />
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}

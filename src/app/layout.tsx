import type { Metadata } from "next";
import { Geist, Geist_Mono, Fustat } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import LayoutContent from "@/components/LayoutContent";

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
  title: "Volunchain",
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
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="flex flex-col justify-between min-h-screen text-text-light overflow-x-hidden">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}

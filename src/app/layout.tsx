import type { Metadata } from "next";
import { Geist, Geist_Mono, Fustat } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

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
      <body className="flex flex-col justify-between min-h-screen text-text-light overflow-x-hidden gap-0">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

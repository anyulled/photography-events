import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { title } from "@/components/constants";
import { Footer } from "@/components/ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { NavMenu } from "@/components/ui/navMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: title,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-teal-100">
      <body className={`${inter.className} h-max bg-gray-100`}>
        <NavMenu />
        <div className="h-max">
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
            {children}
            <SpeedInsights />
            <Analytics />
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

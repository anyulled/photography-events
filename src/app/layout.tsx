import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Footer } from "@/components/ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { auth } from "../../auth";
import { NavMenu } from "@/components/ui/navMenu";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null | undefined = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="h-full bg-teal-100">
        <body className={`${inter.className} h-max bg-gray-100`}>
          <NavMenu session={session} />
          <div className="h-max">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
          </div>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}

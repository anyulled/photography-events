import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import {Footer} from "@/components/ui/footer";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import {auth} from "../../auth";
import {NavMenu} from "@/components/ui/navMenu";
import {Metadata} from "next";

const inter = Inter({ subsets: ["latin"] });

const openGraph = {
  title: "Photography Events",
  description: "Photography events in Barcelona.",
  url: "https://photography-events.com/",
  siteName: "Photography events in Barcelona.",
  images: [
    {
      url: "https://live.staticflickr.com/65535/53367295647_2ff0fdf881_h.jpg",
      width: 1200,
      height: 630,
      alt: "Photography events in Barcelona",
    },
  ],
  locale: "en_US",
  type: "website",
};


export const metadata: Metadata = {
  title: {
    template: "%s · Photography Events",
    default: "Home · Photography Events",
  },
  description: "Photography Events nearby.",
  openGraph: openGraph,
  twitter: {
    card: "summary_large_image",
    title: "Photography Events",
    description: "Photography events close to you.",
    images: [
      "https://live.staticflickr.com/65535/53367295647_2ff0fdf881_h.jpg",
    ],
    site: "@anyulled",
    creator: "@anyulled",
  },
};

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

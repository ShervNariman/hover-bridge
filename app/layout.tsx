import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PostHogAnalytics } from "@/components/analytics/posthog-analytics";
import { ProductEvents } from "@/components/analytics/product-events";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hover-bridge — make hover menus less fragile",
  description:
    "A tiny CSS utility that bridges the dead zone between a trigger and its dropdown.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PostHogAnalytics product="hover-bridge" excludeRoutes={["/record"]} />
        <ProductEvents />
      </body>
    </html>
  );
}

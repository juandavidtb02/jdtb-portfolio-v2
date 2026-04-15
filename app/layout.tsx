import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Alex Developer | Software Developer Portfolio",
  description:
    "Creative software developer specializing in modern web applications. View my projects, skills, and experience.",
  keywords: [
    "developer",
    "portfolio",
    "software",
    "react",
    "nextjs",
    "typescript",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" theme="dark" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "A showcase of my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <ParticlesBackground /> */}
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from 'sonner'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans"});

export const metadata: Metadata = {
  title: "Next Auth",
  description: "This is next auth project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >{children}
        <Toaster richColors/>
      </body>
    </html>
  );
}

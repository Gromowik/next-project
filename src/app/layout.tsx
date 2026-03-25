import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Learning — Phenomenal Quiz",
  description: "Ein Lernprojekt auf Basis von Next.js — phänomenale Wissensstruktur, Quiz-Engine und GTC-Terminologie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
        <footer className="mt-auto border-t border-slate-100 bg-white py-5 text-center text-sm text-slate-400">
          <p>
            <span className="font-medium text-slate-500">Gromowik Serge</span>
            {" · "}
            <a
              href="mailto:serge.gromowik@gmail.com"
              className="hover:text-slate-600 underline underline-offset-2"
            >
              serge.gromowik@gmail.com
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

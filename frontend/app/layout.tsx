import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Caveat } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Policy Pilot - TechNova Solutions",
  description:
    "Ask questions about company policies, leave rules, IT security, benefits, and more. Powered by RAG and Gemini.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${caveat.variable}`}
    >
      <body suppressHydrationWarning className="font-sans antialiased bg-[var(--color-bg)]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Sriram Karthikeyan — AI Engineer";
const description =
  "AI Engineer in Sydney shipping LLM apps, RAG and agents in production fintech. Python · LangGraph · Azure.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://sriramkofc.github.io"),
  openGraph: { title, description, type: "website", url: "https://sriramkofc.github.io" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip">{children}</body>
    </html>
  );
}

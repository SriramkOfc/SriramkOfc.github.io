import type { Metadata, Viewport } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Sriram Karthikeyan, AI Engineer";
const description =
  "AI Engineer in Sydney. I build LLM features, RAG and agents for a fintech platform used by licensed financial advisers.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://sriramkofc.github.io"),
  openGraph: { title, description, type: "website", url: "https://sriramkofc.github.io" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip">{children}</body>
    </html>
  );
}

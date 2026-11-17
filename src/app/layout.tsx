import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const title = "Sriram Karthikeyan, AI Engineer";
const description =
  "AI Engineer in Sydney. I build LLM features, RAG and agents for a fintech platform used by licensed financial advisers.";

const shareDescription =
  "AI engineer in Sydney building LLM applications, RAG systems and agents. Experience, projects and contact.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://sriramkofc.github.io"),
  // Link previews (LinkedIn, Slack, X). Image source: scripts/og-image.html
  openGraph: {
    title,
    description: shareDescription,
    type: "website",
    url: "https://sriramkofc.github.io/",
    images: [{ url: "/og-image.png", width: 1200, height: 627, alt: "Sriram Karthikeyan, AI Engineer, Sydney" }],
  },
  twitter: { card: "summary_large_image", title, description: shareDescription, images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip">{children}</body>
    </html>
  );
}

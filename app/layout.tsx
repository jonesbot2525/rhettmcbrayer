import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rhettmcbrayer.com"),
  title: "Rhett McBrayer | Guitarist & Vocalist",
  description:
    "Rhett McBrayer — guitarist, vocalist, and live performer. Book Rhett for your next event.",
  openGraph: {
    title: "Rhett McBrayer | Guitarist & Vocalist",
    description: "Live music. Real energy.",
    url: "https://rhettmcbrayer.com",
    siteName: "Rhett McBrayer",
    images: [
      {
        url: "/images/gig-4.jpg",
        width: 1200,
        height: 630,
        alt: "Rhett McBrayer performing live",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhett McBrayer | Guitarist & Vocalist",
    description: "Live music. Real energy.",
    images: ["/images/gig-4.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

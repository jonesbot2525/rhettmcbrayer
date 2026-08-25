import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rhett McBrayer | Guitarist & Vocalist",
  description:
    "Rhett McBrayer — guitarist, vocalist, and live performer. Book Rhett for your next event.",
  openGraph: {
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
      </body>
    </html>
  );
}

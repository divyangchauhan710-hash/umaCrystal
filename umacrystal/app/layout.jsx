import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProducts } from "@/lib/productsService";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cormorant" });

export const metadata = {
  title: "Uma Crystal | More Than Beautiful",
  description: "Premium gemstones and healing crystals — crafted by nature, curated for you.",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Uma Crystal | More Than Beautiful",
    description: "Premium gemstones and healing crystals — crafted by nature, curated for you.",
    url: "https://umacrystal.com",
    siteName: "Uma Crystal",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 1200,
        alt: "Uma Crystal Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uma Crystal | More Than Beautiful",
    description: "Premium gemstones and healing crystals — crafted by nature, curated for you.",
    images: ["/logo.jpeg"],
  },
};

export default async function RootLayout({ children }) {
  const data = (await getProducts()) ?? { categories: [] };
  const categories = data.categories ?? [];

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-body bg-background text-text antialiased flex flex-col min-h-screen`}>
        <Navbar categories={categories} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer categories={categories} />
        <WhatsAppButton />
      </body>
    </html>
  );
}

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
  description: "Premium gemstones, healing crystals and jewellery — crafted by nature, curated for you.",
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

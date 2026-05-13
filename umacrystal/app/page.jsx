import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Leaf, Truck, Award, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import logoImg from "../public/logo.jpeg";
import { getProducts } from "@/lib/productsService";

export default async function Home() {
  const data = (await getProducts()) ?? { categories: [] };
  const categories = data.categories ?? [];
  const featuredProducts = categories
    .slice(0, 4)
    .map((cat) => cat.products[0])
    .filter(Boolean);

  const features = [
    { icon: <Leaf className="w-8 h-8" />, title: "100% Natural Stones", desc: "Authentic gems straight from nature" },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Ethically Sourced", desc: "Sourced responsibly from trusted origins" },
    { icon: <Truck className="w-8 h-8" />, title: "Pan India Delivery", desc: "Fast and secure shipping nationwide" },
    { icon: <Award className="w-8 h-8" />, title: "Certified Quality", desc: "Guaranteed premium quality stones" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] bg-gradient-to-br from-primary to-[#2C5282] overflow-hidden flex items-center justify-center">
        {/* CSS Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent background-size-[20px_20px]"></div>
        
        {/* Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-light/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-light text-sm font-medium mb-6 backdrop-blur-sm">
            Premium Gemstones & Jewellery
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-md">
            Discover the Power of <br className="hidden md:block" /> Natural Crystals
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 font-light max-w-2xl mx-auto">
            Premium gemstones, healing crystals and jewellery — crafted by nature, curated for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3.5 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Explore Collection
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3.5 bg-transparent border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 inset-x-0 mx-auto animate-bounce flex flex-col items-center justify-center text-white/50 w-full">
          <span className="text-xs uppercase tracking-widest mb-2 pl-[0.1em]">Scroll</span>
          <div className="w-px h-8 bg-white/50"></div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="w-full flex items-center justify-center py-12">
        <div className="w-24 h-px bg-secondary/30"></div>
        <div className="mx-4 text-gold shrink-0">✧</div>
        <div className="w-24 h-px bg-secondary/30"></div>
      </div>

      {/* Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">Our Collections</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide range of authentic, high-quality crystals and gemstones for every purpose.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-background py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">Featured Products</h2>
              <p className="text-gray-500 max-w-2xl">Hand-picked selections from our premium collections.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center text-primary font-medium hover:text-gold transition-colors group">
              View All <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 gap-6 scrollbar-hide">
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center text-primary font-medium border border-primary/20 px-6 py-2 rounded-full">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">Why Choose Uma Crystal</h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-light/20 text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-text">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Snippet */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">The Story of <br className="hidden lg:block"/> Uma Crystal</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Uma Crystal is a fresh startup driven by a passion for natural gemstones. Founded in Khambhat, we represent a new generation of curators bringing the pure energy of mother nature to you. Every piece in our new collection is personally selected to ensure authenticity and premium quality.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
                  Read Our Full Story
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              {/* Decorative elegant element */}
              <div className="aspect-square w-full max-w-md mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-light rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-secondary to-gold rounded-[2rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-20"></div>
                <div className="absolute inset-4 bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 text-center border border-gray-50">
                  <div>
                    <div className="w-64 h-32 relative mx-auto mb-6 overflow-hidden">
                      <Image src={logoImg} alt="Uma Crystal" fill className="object-contain scale-[1.5] opacity-80 mix-blend-multiply" />
                    </div>
                    <p className="font-heading text-2xl text-primary italic">&quot;More Than Beautiful&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Banner */}
      <section className="w-full bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Interested in our products?
          </h2>
          <p className="text-light text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get in touch today for wholesale inquiries, custom orders, or any questions about our collection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg w-full sm:w-auto"
            >
              Contact Us Now
            </Link>
            <a 
              href="https://wa.me/919327105966" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all shadow-lg w-full sm:w-auto flex items-center justify-center"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

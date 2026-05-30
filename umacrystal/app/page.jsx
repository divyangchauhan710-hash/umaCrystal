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
      <section className="relative w-full h-[95vh] bg-gradient-to-br from-[#0F1E36] via-[#1B3A6B] to-[#2C5282] overflow-hidden flex items-center justify-center">
        {/* CSS Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent background-size-[20px_20px]"></div>
        
        {/* Glowing Orbs with Pulse-Glow animation */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-light/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow [animation-delay:4s]"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-8 backdrop-blur-sm animate-fade-up">
            Premium Gemstones
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-normal tracking-wide text-white mb-8 leading-[1.15] drop-shadow-lg animate-fade-up [animation-delay:200ms]">
            Discover the Power of <br className="hidden md:block" /> Natural Crystals
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-12 font-serif-accent italic font-light max-w-2xl mx-auto animate-fade-up [animation-delay:400ms]">
            Premium gemstones and healing crystals — crafted by nature, curated for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto animate-fade-up [animation-delay:600ms]">
            <Link 
              href="/products" 
              className="px-10 py-4 bg-white text-primary rounded-full font-medium hover:bg-gold hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto uppercase tracking-wider text-xs"
            >
              Explore Collection
            </Link>
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm uppercase tracking-wider text-xs"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 inset-x-0 mx-auto animate-bounce flex flex-col items-center justify-center text-white/40 w-full">
          <span className="text-[10px] uppercase tracking-[0.2em] mb-2 pl-[0.1em] font-medium">Scroll</span>
          <div className="w-px h-8 bg-white/30"></div>
        </div>
      </section>

      {/* Decorative Divider with elegant space */}
      <div className="w-full flex items-center justify-center py-20 bg-background">
        <div className="w-32 h-px bg-gold/20"></div>
        <div className="mx-6 text-gold shrink-0 text-lg animate-float">✧</div>
        <div className="w-32 h-px bg-gold/20"></div>
      </div>

      {/* Category Showcase - Increased breathing space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-normal tracking-wide text-text mb-4">Our Collections</h2>
          <p className="text-gray-500 font-serif-accent text-lg italic max-w-2xl mx-auto">Explore our wide range of authentic, high-quality crystals and gemstones for every purpose.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {(() => {
            const FAMOUS_CATEGORY_IDS = [
              "gemstone-bracelets",
              "orgone-pyramid",
              "gemstone-healing-wand",
              "tumbled-stones",
              "gemstone-tree",
              "selenite-stone"
            ];
            const famousCategories = FAMOUS_CATEGORY_IDS.map(id => categories.find(cat => cat.id === id)).filter(Boolean);
            return famousCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} large={true} />
            ));
          })()}
        </div>
        
        <div className="text-center">
          <Link href="/products" className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white rounded-full font-medium hover:bg-gold transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-xs">
            View All Collections <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Featured Products - Increased padding and elegant layout */}
      <section className="bg-white py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-normal tracking-wide text-text mb-4">Featured Products</h2>
              <p className="text-gray-500 font-serif-accent text-lg italic max-w-2xl">Hand-picked selections from our premium collections.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center text-primary font-medium hover:text-gold transition-colors group uppercase tracking-wider text-xs">
              View All <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 gap-8 scrollbar-hide">
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] sm:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center text-primary font-medium border border-primary/20 px-8 py-3 rounded-full uppercase tracking-wider text-xs">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced spacing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-heading font-normal tracking-wide text-text mb-4">Why Choose Uma Crystal</h2>
          <p className="text-gray-500 font-serif-accent text-lg italic mb-6">Our commitment to purity and quality</p>
          <div className="w-16 h-px bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-8 rounded-2xl bg-white border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light/10 text-primary mb-8 animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>
                {feature.icon}
              </div>
              <h3 className="font-heading font-normal text-text text-xl mb-4 tracking-wide">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Snippet - Increased spacing and gap */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-normal tracking-wide text-text leading-tight">
                The Story of <br className="hidden lg:block"/> Uma Crystal
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                Uma Crystal is a fresh startup driven by a passion for natural gemstones. Founded in Khambhat, we represent a new generation of curators bringing the pure energy of mother nature to you. Every piece in our new collection is personally selected to ensure authenticity and premium quality.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-gold transition-all shadow-sm hover:-translate-y-0.5 uppercase tracking-wider text-xs">
                  Read Our Full Story
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              {/* Decorative elegant element */}
              <div className="aspect-square w-full max-w-md mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-light rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-secondary to-gold rounded-[2rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-20"></div>
                <div className="absolute inset-4 bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 text-center border border-gray-50">
                  <div>
                    <div className="w-64 h-32 relative mx-auto mb-8 overflow-hidden">
                      <Image src={logoImg} alt="Uma Crystal" fill className="object-contain scale-[1.5] opacity-80 mix-blend-multiply" />
                    </div>
                    <p className="font-serif-accent text-3xl font-light text-primary italic tracking-wide">&quot;More Than Beautiful&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Banner - Luxurious upgrade */}
      <section className="w-full bg-[#0F1E36] relative overflow-hidden py-32">
        <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-light/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-normal tracking-wide text-white mb-6">
            Interested in our products?
          </h2>
          <p className="text-light font-serif-accent italic text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
            Get in touch today for wholesale inquiries, custom orders, or any questions about our collection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-gradient-to-r from-gold to-[#E2C770] text-[#0F1E36] font-body font-semibold tracking-[0.15em] hover:from-white hover:to-white hover:text-primary hover:shadow-[0_8px_30px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 rounded-full text-xs uppercase shadow-md w-full sm:w-auto text-center border border-gold/30"
            >
              Contact Us Now
            </Link>
            <a 
              href="https://wa.me/919327105966" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-transparent hover:shadow-[0_8px_30px_rgba(37,211,102,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 rounded-full text-xs uppercase flex items-center justify-center font-body font-semibold tracking-[0.15em] w-full sm:w-auto"
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

import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us | Uma Crystal",
  description: "Learn about Uma Crystal's passion for natural gemstones and healing crystals.",
};

export default function About() {
  const values = [
    { icon: <Sparkles className="w-8 h-8" />, title: "100% Natural", desc: "Every crystal we sell is guaranteed natural and untreated unless explicitly stated." },
    { icon: <Shield className="w-8 h-8" />, title: "Authentic & Trusted", desc: "We source directly from trusted miners and artisans worldwide to ensure authenticity." },
    { icon: <Award className="w-8 h-8" />, title: "Premium Quality", desc: "We hand-select each piece to ensure it meets our strict quality standards." },
    { icon: <Heart className="w-8 h-8" />, title: "Customer First", desc: "Your journey with crystals matters to us. We provide personalized support and care." },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About Uma Crystal</h1>
          <p className="text-xl text-light max-w-2xl mx-auto font-light">
            More than just beautiful stones — we bring you the pure energy of the earth.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image 
                src="https://placehold.co/800x1000/1B3A6B/FFFFFF?text=Uma+Crystal+Store" 
                alt="Uma Crystal Store" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-[200px] border border-gray-100 hidden sm:block">
              <p className="font-heading text-4xl font-bold text-gold mb-1">10+</p>
              <p className="text-sm text-gray-500 font-medium">Years of Trust & Excellence</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text">Our Story</h2>
            <div className="w-20 h-1 bg-gold rounded-full"></div>
            
            <div className="prose prose-lg text-gray-600 space-y-4 pt-4">
              <p>
                Uma Crystal was established with a passion for natural gemstones and healing crystals. We believe in the profound energy and beauty that mother nature provides.
              </p>
              <p>
                What started as a small personal collection has grown into a trusted destination for crystal lovers, healers, and jewelry makers across India. We source the finest stones from trusted origins and bring them to you with care and authenticity.
              </p>
              <p>
                Every piece in our collection is carefully selected to ensure authenticity, quality, and energetic purity. Whether you are looking for a statement piece for your home, a healing wand for your practice, or simply a beautiful gemstone bracelet, Uma Crystal is here to provide you with the best nature has to offer.
              </p>
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-6 border-t mt-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Established</p>
                <p className="font-heading text-xl font-bold text-primary">2014</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-heading text-xl font-bold text-primary">Ahmedabad, India</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-1">Nature of Business</p>
                <p className="font-heading text-xl font-bold text-primary">Retail & Wholesale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The principles that guide everything we do at Uma Crystal.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-background p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-secondary mb-6 shadow-sm">
                  {val.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-primary mb-3">{val.title}</h3>
                <p className="text-gray-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <h2 className="text-3xl font-heading font-bold text-text mb-6">Ready to explore our collection?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the perfect crystal that resonates with your energy.
        </p>
        <Link href="/products" className="inline-flex items-center px-8 py-3.5 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          View All Products
        </Link>
      </section>
    </div>
  );
}

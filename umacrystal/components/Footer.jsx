"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import logoImg from "../public/logo.jpeg";

export default function Footer({ categories = [] }) {

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg overflow-hidden">
              <Image
                src={logoImg}
                alt="Uma Crystal Logo"
                width={300}
                height={120}
                className="h-24 w-auto object-contain scale-125 transform origin-center"
              />
            </Link>
            <p className="text-light text-lg italic font-heading">&quot;More Than Beautiful&quot;</p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Premium gemstones, healing crystals and jewellery — crafted by nature, curated for you. We source the finest stones from trusted origins.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/919327105966" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center hover:bg-secondary transition-colors">
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center hover:bg-secondary transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center hover:bg-secondary transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links & Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-semibold text-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm">Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm">+91 93271 05966</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm">contact@umacrystal.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="w-5 h-5 text-gold shrink-0 flex items-center justify-center font-bold text-xs border border-gold rounded-sm">G</span>
                <span className="text-sm">GSTIN: 24AAACU1234A1Z5</span>
              </div>
            </div>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-semibold text-gold">Our Collections</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${cat.id}`} className="text-sm text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="mr-2 text-xs">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Uma Crystal. All Rights Reserved.
          </p>
          <div className="text-sm text-gray-400">
            Designed with elegance
          </div>
        </div>
      </div>
    </footer>
  );
}

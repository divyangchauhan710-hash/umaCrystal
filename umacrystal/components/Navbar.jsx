"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import logoImg from "../public/logo.jpeg";

export default function Navbar({ categories = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-white/85 backdrop-blur-md shadow-md border-b border-gray-100 py-1" 
          : "bg-white border-b border-gray-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center transition-all duration-500 h-[100px]">
          {/* Logo - Made much bigger as requested */}
          <div className="flex-shrink-0 flex items-center h-full overflow-hidden w-64">
            <Link href="/" className="flex items-center h-full py-2 w-full justify-start">
              <Image
                src={logoImg}
                alt="Uma Crystal Logo"
                width={400}
                height={160}
                className="h-[120px] w-auto object-contain scale-150 transform origin-left transition-transform duration-300 hover:scale-[1.6]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className={`relative font-medium transition-colors hover:text-primary py-2 group ${
                pathname === "/" ? "text-primary" : "text-text"
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${
                pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              onMouseLeave={() => setDesktopDropdownOpen(false)}
            >
              <Link
                href="/products"
                className={`group flex items-center font-medium transition-colors hover:text-primary relative ${
                  pathname.startsWith("/products") ? "text-primary" : "text-text"
                }`}
              >
                Products 
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${desktopDropdownOpen ? "rotate-180 text-primary" : ""}`} />
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${
                  pathname.startsWith("/products") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>

              {/* Animated Dropdown Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl border border-gray-100 p-6 pt-5 grid grid-cols-2 gap-x-8 gap-y-4 transition-all duration-300 origin-top ${
                  desktopDropdownOpen ? "opacity-100 scale-y-100 translate-y-2 pointer-events-auto" : "opacity-0 scale-y-95 translate-y-0 pointer-events-none"
                }`}
              >
                <div className="col-span-2 text-sm font-semibold text-gray-400 mb-1 border-b border-gray-100 pb-2 uppercase tracking-wider">
                  Our Collections
                </div>
                {categories.map((cat, idx) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.id}`}
                    className="group/item flex items-center p-2 -m-2 rounded-lg hover:bg-light/10 transition-all duration-300"
                    style={{ transitionDelay: `${idx * 20}ms` }}
                  >
                    <span className="text-2xl mr-4 transform transition-transform duration-300 group-hover/item:scale-125 group-hover/item:-rotate-6">{cat.icon}</span>
                    <div>
                      <p className="font-medium text-text group-hover/item:text-primary transition-colors">
                        {cat.name}
                      </p>
                    </div>
                  </Link>
                ))}
                <div className="col-span-2 mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link
                    href="/products"
                    className="text-primary font-medium hover:text-gold transition-colors inline-flex items-center group/link"
                  >
                    View All Products 
                    <span className="ml-1 transform transition-transform group-hover/link:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className={`relative font-medium transition-colors hover:text-primary py-2 group ${
                pathname === "/about" ? "text-primary" : "text-text"
              }`}
            >
              About Us
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${
                pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
            </Link>
            
            <Link
              href="/contact"
              className={`relative font-medium transition-colors hover:text-primary py-2 group ${
                pathname === "/contact" ? "text-primary" : "text-text"
              }`}
            >
              Contact Us
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${
                pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}></span>
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center ml-4">
            <a
              href="https://wa.me/919327105966"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Chat with Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text hover:text-primary p-2 focus:outline-none transition-colors"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 top-3 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-400 ease-in-out overflow-hidden origin-top ${
          mobileMenuOpen ? "max-h-screen opacity-100 border-t" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-2 h-[calc(100vh-80px)] overflow-y-auto">
          <Link
            href="/"
            className={`block px-4 py-3.5 rounded-xl font-medium transition-colors ${
              pathname === "/" ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
            }`}
          >
            Home
          </Link>
          
          <div className="rounded-xl overflow-hidden bg-gray-50/50">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className={`w-full flex items-center justify-between px-4 py-3.5 font-medium transition-colors ${
                pathname.startsWith("/products") ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180 text-primary" : ""}`} />
            </button>
            
            {/* Mobile Categories Dropdown */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${mobileDropdownOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="p-3 pl-6 space-y-1 bg-white/50 border-t border-gray-100">
                <Link
                  href="/products"
                  className="block py-3 px-3 text-sm font-semibold text-primary mb-1 border-b border-gray-100 uppercase tracking-wider"
                >
                  View All Collections &rarr;
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.id}`}
                    className="flex items-center px-3 py-3 rounded-lg text-gray-600 hover:text-primary hover:bg-light/10 transition-colors"
                  >
                    <span className="mr-4 text-xl">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className={`block px-4 py-3.5 rounded-xl font-medium transition-colors ${
              pathname === "/about" ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`block px-4 py-3.5 rounded-xl font-medium transition-colors ${
              pathname === "/contact" ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-6 pb-4">
            <a
              href="https://wa.me/919327105966"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-4 rounded-xl font-bold transition-all shadow-md"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span>Chat with Us</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

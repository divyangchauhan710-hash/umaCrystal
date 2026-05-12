"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import categoriesData from "@/data/products.json";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const categories = categoriesData.categories;

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out bg-white ${
        isScrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/logo.jpeg"
                alt="Uma Crystal Logo"
                width={150}
                height={56}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-text"
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              onMouseLeave={() => setDesktopDropdownOpen(false)}
            >
              <Link
                href="/products"
                className={`flex items-center font-medium transition-colors hover:text-primary py-2 ${
                  pathname.startsWith("/products") ? "text-primary" : "text-text"
                }`}
              >
                Products <ChevronDown className="ml-1 w-4 h-4" />
              </Link>

              {desktopDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl rounded-b-lg border border-t-0 border-gray-100 p-6 pt-4 grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="col-span-2 text-sm font-semibold text-gray-500 mb-2 border-b pb-2">
                    Our Collections
                  </div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.id}`}
                      className="group flex items-center p-2 -m-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl mr-3">{cat.icon}</span>
                      <div>
                        <p className="font-medium text-text group-hover:text-primary transition-colors">
                          {cat.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 mt-4 pt-4 border-t text-center">
                    <Link
                      href="/products"
                      className="text-primary font-medium hover:underline inline-block"
                    >
                      View All Products &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-text"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/contact" ? "text-primary" : "text-text"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text hover:text-primary p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 h-[calc(100vh-80px)] overflow-y-auto">
          <Link
            href="/"
            className={`block px-3 py-3 rounded-md font-medium ${
              pathname === "/" ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
            }`}
          >
            Home
          </Link>
          
          <div>
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-md font-medium ${
                pathname.startsWith("/products") ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Mobile Categories Dropdown */}
            <div className={`pl-6 pr-3 overflow-hidden transition-all ${mobileDropdownOpen ? "max-h-96 py-2" : "max-h-0"}`}>
              <Link
                href="/products"
                className="block py-2 text-sm font-medium text-primary mb-2 border-b"
              >
                View All Categories
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.id}`}
                  className="flex items-center py-2.5 text-gray-600 hover:text-primary"
                >
                  <span className="mr-3">{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/about"
            className={`block px-3 py-3 rounded-md font-medium ${
              pathname === "/about" ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-3 rounded-md font-medium ${
              pathname === "/contact" ? "bg-light/20 text-primary" : "text-text hover:bg-gray-50"
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-6 pb-2">
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-medium transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with Us</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

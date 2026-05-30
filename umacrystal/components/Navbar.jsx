"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { icons } from "@/lib/icons";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import logoImg from "../public/logo.jpeg";
import Search from "./Search";

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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out py-2.5 ${
        isScrolled 
          ? "bg-white/85 backdrop-blur-md shadow-md border-b border-gray-100" 
          : "bg-white border-b border-gray-100"
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
                onClick={() => setDesktopDropdownOpen(false)}
                className={`group flex items-center font-medium transition-colors hover:text-primary relative ${
                  pathname.startsWith("/products") ? "text-primary" : "text-text"
                }`}
              >
                Products 
                <icons.ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${desktopDropdownOpen ? "rotate-180 text-primary" : ""}`} />
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${
                  pathname.startsWith("/products") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>

              {/* Animated Dropdown Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[980px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 p-8 transition-all duration-300 origin-top ${
                  desktopDropdownOpen ? "opacity-100 scale-y-100 translate-y-2 pointer-events-auto" : "opacity-0 scale-y-95 translate-y-0 pointer-events-none"
                }`}
              >
                <div className="text-sm font-semibold text-gray-400 mb-6 border-b border-gray-100 pb-2 uppercase tracking-wider">
                  Our Collections
                </div>
                {(() => {
                  const categoryGroups = [
                    {
                      title: "Best Sellers",
                      color: "from-amber-500 to-yellow-600",
                      categoryIds: [
                        "gemstone-bracelets",
                        "orgone-pyramid",
                        "gemstone-healing-wand",
                        "tumbled-stones",
                        "selenite-stone",
                        "gemstone-tree",
                        "pyramid-stone",
                        "healing-crystals"
                      ]
                    },
                    {
                      title: "Spiritual & Healing",
                      color: "from-purple-500 to-indigo-600",
                      categoryIds: [
                        "rudraksha",
                        "jap-mala",
                        "gemstone-angels",
                        "shree-yantra",
                        "gemstone-pendulum",
                        "merkaba-star",
                        "unique-products",
                        "fancy-product",
                        "crystal-shivling"
                      ]
                    },
                    {
                      title: "Home & Decor",
                      color: "from-blue-500 to-teal-600",
                      categoryIds: [
                        "gemstone-ball",
                        "rough-stone",
                        "ganesh-statue",
                        "statue",
                        "crystal-diya",
                        "crystal-flower",
                        "crystal-flowers",
                        "coster-plates",
                        "zibu-coin",
                        "vastu-accessories"
                      ]
                    },
                    {
                      title: "Jewelry & Accessories",
                      color: "from-rose-500 to-pink-600",
                      categoryIds: [
                        "gemstone-pendant",
                        "beads-string-8mm",
                        "palm-stone",
                        "gemstone-ring",
                        "tumbled-bracelets",
                        "chips-bracelets",
                        "ladies-anklet",
                        "roller-and-guasha",
                        "crystal-rakhi",
                        "crystal-heart-stone",
                        "gemstone"
                      ]
                    }
                  ];

                  const groupedCategories = categoryGroups.map(group => {
                    const items = categories.filter(cat => group.categoryIds.includes(cat.id));
                    return { ...group, items };
                  });

                  const allGroupedIds = categoryGroups.flatMap(g => g.categoryIds);
                  const leftoverCategories = categories.filter(cat => !allGroupedIds.includes(cat.id));
                  if (leftoverCategories.length > 0) {
                    groupedCategories[groupedCategories.length - 1].items.push(...leftoverCategories);
                  }

                  return (
                    <div className="grid grid-cols-4 gap-8">
                      {groupedCategories.map((group, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                            <div className={`w-1.5 h-4 rounded-full bg-gradient-to-b ${group.color}`}></div>
                            <h4 className="text-xs font-bold text-text uppercase tracking-wider">
                              {group.title}
                            </h4>
                          </div>
                          <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                            {group.items.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products/${cat.id}`}
                                onClick={() => setDesktopDropdownOpen(false)}
                                className="group/item flex items-center p-1.5 rounded-lg hover:bg-light/10 transition-colors"
                              >
                                <span className="text-primary/70 group-hover/item:text-primary mr-2.5 transition-colors shrink-0">
                                  {(() => {
                                    const IconComponent = icons[cat.icon] || icons.Gem;
                                    return <IconComponent className="w-4 h-4" />;
                                  })()}
                                </span>
                                <span className="font-medium text-text group-hover/item:text-primary transition-colors text-xs truncate">
                                  {cat.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <Link
                    href="/products"
                    onClick={() => setDesktopDropdownOpen(false)}
                    className="text-primary font-medium hover:text-gold transition-colors inline-flex items-center group/link text-sm"
                  >
                    View All Collections
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

            <Search categories={categories} />
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center ml-4">
            <a
              href="https://wa.me/919327105966"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#25D366]/10 border border-[#25D366]/40 text-[#1EBE5D] hover:bg-[#25D366] hover:text-white hover:border-transparent px-6 py-2.5 rounded-full font-body font-semibold tracking-wider text-xs uppercase transition-all duration-300 shadow-sm hover:shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:-translate-y-0.5 group"
            >
              <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Chat with Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Search categories={categories} />
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
              <icons.ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180 text-primary" : ""}`} />
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
                    <span className="mr-4 text-primary/70">
                      {(() => {
  const IconComponent = icons[cat.icon] || icons.Gem;
  return <IconComponent className="w-5 h-5" />;
                      })()}
                    </span>
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
              className="flex w-full items-center justify-center space-x-2.5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#1EBE5D] hover:bg-[#25D366] hover:text-white hover:border-transparent px-5 py-3.5 rounded-xl font-body font-semibold tracking-wider text-xs uppercase transition-all duration-300"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat with Us</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

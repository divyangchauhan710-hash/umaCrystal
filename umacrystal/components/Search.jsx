"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Search({ categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  // Extract all products from categories
  const allProducts = categories.flatMap(cat => 
    cat.products.map(p => ({ ...p, categoryName: cat.name, categoryId: cat.id }))
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.specs?.["Stone Type"]?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // For now, we'll just close it, but could navigate to a search results page
      handleClose();
    }
  };

  return (
    <>
      {/* Search Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 text-text hover:text-primary hover:bg-light/10 rounded-full transition-all duration-300 group"
        aria-label="Search products"
      >
        <SearchIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Full-screen Search Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-primary/20 backdrop-blur-xl"
          onClick={handleClose}
        ></div>

        {/* Search Container */}
        <div 
          className={`absolute inset-x-0 top-0 bg-white shadow-2xl border-b border-gray-100 transition-transform duration-500 ease-out p-6 md:p-12 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-4xl mx-auto relative">
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8 p-3 text-gray-400 hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gold animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for crystals, bracelets, or healing stones..."
                className="w-full bg-transparent border-none text-2xl md:text-4xl font-heading font-medium text-primary py-4 pl-12 pr-4 focus:ring-0 outline-none placeholder:text-gray-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100">
                <div 
                  className="h-full bg-gold transition-all duration-300" 
                  style={{ width: `${query.length > 0 ? 100 : 0}%` }}
                ></div>
              </div>
            </form>

            {/* Quick Suggestions / Results */}
            <div className="mt-12">
              {results.length > 0 ? (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Product Matches</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.categoryId}`}
                        onClick={handleClose}
                        className="flex items-center p-3 rounded-2xl hover:bg-light/5 border border-transparent hover:border-gray-100 transition-all group"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-heading font-semibold text-primary group-hover:text-gold transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-400 font-medium">{product.categoryName} • ₹{product.price}</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-gray-200 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : query.length > 1 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg italic">No crystals found matching "{query}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-full mb-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Popular Categories</h3>
                  </div>
                  {categories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.id}`}
                      onClick={handleClose}
                      className="p-4 rounded-2xl bg-gray-50 hover:bg-light/10 text-center transition-all group border border-transparent hover:border-light/20"
                    >
                      <Gem className="w-6 h-6 mx-auto mb-2 text-primary/40 group-hover:text-gold transition-colors" />
                      <span className="text-sm font-semibold text-primary">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

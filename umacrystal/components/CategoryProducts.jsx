"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { icons } from "@/lib/icons";

export default function CategoryProducts({ categoryData }) {
  const [sortOrder, setSortOrder] = useState('default');
  
  const IconComponent = icons[categoryData.icon] || icons.Gem;

  // Sort logic (frontend only)
  let displayedProducts = [...categoryData.products];
  if (sortOrder === 'price-low-high') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high-low') {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <section className="bg-white border-b border-gray-100 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 flex items-center mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{categoryData.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-light/20 text-primary rounded-full flex items-center justify-center mr-5 shrink-0">
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-text mb-2">{categoryData.name}</h1>
                <p className="text-gray-600 max-w-2xl">{categoryData.description}</p>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center bg-gray-50 p-1.5 rounded-lg border border-gray-200 self-start md:self-auto">
              <span className="text-sm font-medium text-gray-500 px-3">Sort by:</span>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border-none text-sm font-medium py-1.5 px-3 rounded shadow-sm focus:ring-0 outline-none cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-500 font-medium text-sm">
            Showing all {displayedProducts.length} results
          </p>
        </div>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
        
        <div className="mt-16 text-center border-t border-gray-200 pt-10">
          <Link href="/products" className="inline-flex items-center text-primary font-medium hover:text-gold transition-colors">
            <icons.ArrowLeft className="w-4 h-4 mr-2" /> Back to All Collections
          </Link>
        </div>
      </section>
    </>
  );
}

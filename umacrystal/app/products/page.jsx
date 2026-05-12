"use client";

import CategoryCard from "@/components/CategoryCard";
import { useEffect, useState } from "react";

export const metadata = {
  title: "Products & Collections | Uma Crystal",
  description: "Explore our wide range of authentic natural gemstones, healing crystals, rudraksha, and jewellery.",
};

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Products & Collections</h1>
          <p className="text-lg text-light max-w-2xl mx-auto font-light">
            Discover our carefully curated selection of natural stones, crafted for beauty and healing.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-sm text-gray-500 flex items-center">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Products</span>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} large={true} />
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import CategoryProducts from "@/components/CategoryProducts";
import { useEffect, useState } from "react";

export default function CategoryPage({ params }) {
  const { category } = params;
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        const foundCategory = data.categories?.find(c => c.id === category);
        setCategoryData(foundCategory);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setCategoryData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="bg-background min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Sparkles className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Category Not Found</h1>
        <p className="text-gray-500 mb-6">The collection you are looking for does not exist.</p>
        <Link href="/products" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
          Browse All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <CategoryProducts categoryData={categoryData} />
    </div>
  );
}

// Ensure static generation for dynamic routes
export async function generateStaticParams() {
  return categoriesData.categories.map((cat) => ({
    category: cat.id,
  }));
}

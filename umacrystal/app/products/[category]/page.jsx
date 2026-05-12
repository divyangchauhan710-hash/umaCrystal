import Link from "next/link";
import categoriesData from "@/data/products.json";
import { Sparkles } from "lucide-react";
import CategoryProducts from "@/components/CategoryProducts";

export default function CategoryPage({ params }) {
  const { category } = params;
  const categoryData = categoriesData.categories.find(c => c.id === category);

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

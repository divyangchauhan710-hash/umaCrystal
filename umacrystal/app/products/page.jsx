import CategoryCard from "@/components/CategoryCard";
import { getProducts } from "@/lib/sheetsService";

export const metadata = {
  title: "Products & Collections | Uma Crystal",
  description: "Explore our wide range of authentic natural gemstones, healing crystals, rudraksha, and jewellery.",
};

export default async function ProductsPage() {
  const data = await getProducts();
  const categories = data.categories || [];

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

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No categories found.</p>
          </div>
        )}
      </section>
    </div>
  );
}
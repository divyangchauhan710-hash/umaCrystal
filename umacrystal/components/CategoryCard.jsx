import Link from "next/link";

export default function CategoryCard({ category, large = false }) {
  return (
    <Link href={`/products/${category.id}`} className="block group">
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 relative overflow-hidden h-full flex flex-col ${large ? "min-h-[240px]" : ""}`}>
        {/* Decorative corner */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-light/10 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className={`flex items-center justify-center bg-background rounded-full mb-4 text-primary shrink-0 ${large ? "w-16 h-16 text-3xl" : "w-12 h-12 text-2xl"}`}>
            {category.icon}
          </div>
          
          <h3 className={`font-heading font-semibold text-primary mb-2 transition-colors group-hover:text-gold ${large ? "text-2xl" : "text-xl"}`}>
            {category.name}
          </h3>
          
          {large && category.description && (
            <p className="text-gray-600 text-sm flex-grow">
              {category.description}
            </p>
          )}
          
          <div className="mt-4 text-sm font-medium text-secondary flex items-center transition-colors group-hover:text-primary">
            Explore Collection
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

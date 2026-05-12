import { getProducts } from "@/lib/sheetsService";

export async function GET() {
  try {
    const products = await getProducts();
    
    return Response.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

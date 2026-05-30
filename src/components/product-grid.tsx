import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => {
          const demoStock = [3, 1, 42, 80, 5, 18, 2, 67, 4, 55][i % 10];
          return (
            <ProductCard key={product.id} product={product} stock={demoStock} maxStock={100} />
          );
        })}
      </div>
    </div>
  );
}

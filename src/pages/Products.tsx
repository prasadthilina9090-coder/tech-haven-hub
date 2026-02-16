import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import { Category, categoryLabels } from "@/types/product";
import { Button } from "@/components/ui/button";

const allCategories: Category[] = ["laptops", "laptop-parts", "desktops", "desktop-parts", "mobile-parts"];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();
  const activeCategory = searchParams.get("category") as Category | null;

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">
        {activeCategory ? categoryLabels[activeCategory] : "All Products"}
      </h1>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={!activeCategory ? "default" : "outline"}
          onClick={() => setSearchParams({})}
        >
          All
        </Button>
        {allCategories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setSearchParams({ category: cat })}
          >
            {categoryLabels[cat]}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">No products found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Laptop, Monitor, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { categoryLabels, Category } from "@/types/product";
import heroBanner from "@/assets/hero-banner.jpg";

const categories: { key: Category; icon: React.ReactNode; label: string }[] = [
  { key: "laptops", icon: <Laptop className="h-8 w-8" />, label: "Laptops" },
  { key: "laptop-parts", icon: <Cpu className="h-8 w-8" />, label: "Laptop Parts" },
  { key: "desktops", icon: <Monitor className="h-8 w-8" />, label: "Desktops" },
  { key: "desktop-parts", icon: <Zap className="h-8 w-8" />, label: "Desktop Parts" },
  { key: "mobile-parts", icon: <Smartphone className="h-8 w-8" />, label: "Mobile Parts" },
];

export default function Index() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Tech hardware" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Your Ultimate <span className="text-gradient">Tech Store</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Premium laptops, desktops, and components at unbeatable prices. Build, upgrade, or repair — we've got everything you need.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="gap-2 glow-blue">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products?category=desktop-parts">
                <Button size="lg" variant="outline">
                  Browse Parts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/products?category=${cat.key}`}
              className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:bg-secondary glow-card"
            >
              <div className="text-muted-foreground transition-colors group-hover:text-primary">
                {cat.icon}
              </div>
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Deals */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">🔥 Hot Deals</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

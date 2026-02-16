import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Star, Check } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const product = getProduct(id || "");

  if (!product) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Product not found</h2>
        <Link to="/products"><Button variant="outline">← Back to Products</Button></Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2 mt-4">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {discount > 0 && (
            <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground text-sm">
              -{discount}% OFF
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">{product.brand}</p>
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Specifications</h3>
            <ul className="space-y-2">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" /> {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {product.inStock ? (
              <Badge variant="outline" className="border-success text-success">In Stock</Badge>
            ) : (
              <Badge variant="outline" className="border-destructive text-destructive">Out of Stock</Badge>
            )}
          </div>

          <Button
            size="lg"
            className="mt-2 gap-2 glow-blue"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

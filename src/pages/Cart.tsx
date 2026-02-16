import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32">
        <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 text-2xl font-bold text-foreground">Your cart is empty</h2>
        <p className="mb-6 text-muted-foreground">Browse our products and add items to your cart.</p>
        <Link to="/products"><Button>Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link to={`/product/${product.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-foreground">${(product.price * quantity).toFixed(2)}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card p-6 h-fit sticky top-24">
          <h2 className="mb-4 text-lg font-bold text-foreground">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="mt-6 w-full glow-blue"
            size="lg"
            onClick={() => {
              clearCart();
              toast({ title: "Order placed!", description: "Thank you for your purchase." });
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

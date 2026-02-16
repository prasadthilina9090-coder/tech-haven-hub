import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { Product, Category, categoryLabels } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const defaultProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "laptops",
  brand: "",
  inStock: true,
  specs: [],
  rating: 4.5,
  reviews: 0,
};

const allCategories: Category[] = ["laptops", "laptop-parts", "desktops", "desktop-parts", "mobile-parts"];

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(defaultProduct);
  const [specsText, setSpecsText] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");

  const resetForm = () => {
    setForm(defaultProduct);
    setSpecsText("");
    setEditing(null);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({ ...product });
    setSpecsText(product.specs.join(", "));
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.brand) {
      toast({ title: "Error", description: "Name, price, and brand are required.", variant: "destructive" });
      return;
    }

    const specs = specsText.split(",").map((s) => s.trim()).filter(Boolean);
    const product: Product = {
      ...form,
      id: editing ? editing.id : Date.now().toString(),
      specs,
      image: form.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    };

    if (editing) {
      updateProduct(product);
      toast({ title: "Updated", description: `${product.name} has been updated.` });
    } else {
      addProduct(product);
      toast({ title: "Added", description: `${product.name} has been added.` });
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = (product: Product) => {
    deleteProduct(product.id);
    toast({ title: "Deleted", description: `${product.name} has been removed.` });
  };

  const filtered = filterCat === "all" ? products : products.filter((p) => p.category === filterCat);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your products</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Brand *</label>
                <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Price *</label>
                  <Input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Original Price</label>
                  <Input type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: parseFloat(e.target.value) || undefined })} placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{categoryLabels[cat]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Image URL</label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description" rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Specs (comma separated)</label>
                <Input value={specsText} onChange={(e) => setSpecsText(e.target.value)} placeholder="Spec 1, Spec 2, Spec 3" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="inStock" className="text-sm text-foreground">In Stock</label>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editing ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button size="sm" variant={filterCat === "all" ? "default" : "outline"} onClick={() => setFilterCat("all")}>All ({products.length})</Button>
        {allCategories.map((cat) => (
          <Button key={cat} size="sm" variant={filterCat === cat ? "default" : "outline"} onClick={() => setFilterCat(cat)}>
            {categoryLabels[cat]} ({products.filter((p) => p.category === cat).length})
          </Button>
        ))}
      </div>

      {/* Product table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground hidden md:table-cell">Stock</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{categoryLabels[product.category]}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${product.inStock ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(product)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <Package className="mb-2 h-10 w-10" />
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

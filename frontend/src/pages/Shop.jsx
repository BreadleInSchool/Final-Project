import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  return (
    <div className="shop">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

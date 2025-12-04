import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  return (
    <div className="product-details">
      <img src={product.image} alt="" />
      <h2>{product.name}</h2>
      <p>?{product.price}</p>

      <button>Add to Cart</button>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div
      className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-secondary transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary/5 to-primary/5 overflow-hidden">
        {/* Sale Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <span>🔥</span> HOT
          </span>
        </div>

        {/* Quick View Button */}
        <Link 
          to={`/products/${product._id}`}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-secondary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
        >
          <span className="text-lg">👁️</span>
        </Link>

        {/* Product Image Placeholder */}
        <div className="w-full h-full flex items-center justify-center p-8 transform group-hover:scale-110 transition-transform duration-500">
          <div className="w-28 h-28 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl flex items-center justify-center shadow-inner">
            <span className="text-5xl">📦</span>
          </div>
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-accent text-gray-900 py-3 rounded-2xl font-bold text-sm hover:bg-accent/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 shadow-lg"
            >
              {isAdding ? (
                <span className="text-lg animate-spin">✨</span>
              ) : (
                <>
                  <span>🛒</span>
                  Add to Cart
                </>
              )}
            </button>
            <Link
              to={`/products/${product._id}`}
              className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-700 hover:bg-secondary hover:text-white transition-all duration-300 shadow-lg"
            >
              <span className="text-lg">👁️</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Category */}
        <div className="mb-3">
          <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            {product.category_id?.category_name || 'Uncategorized'}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-primary transition-colors">
            {product.product_name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description || 'Amazing product you\'ll absolutely love! ✨'}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < 4 ? 'grayscale-0' : 'grayscale opacity-30'}`}>
                ⭐
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2 font-medium">(4.0)</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-primary">${product.unit_price?.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            <span>✓</span>
            <span className="text-xs font-bold">In Stock</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
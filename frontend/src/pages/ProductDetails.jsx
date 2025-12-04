import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-secondary/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading something awesome... ✨</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-8xl mb-6 animate-bounce">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Oops! Product Not Found</h2>
          <p className="text-gray-600 mb-6 text-lg">{error}</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold hover:shadow-xl transition-all"
          >
            <span>←</span> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-2xl">
          <Link to="/" className="text-gray-500 hover:text-primary transition flex items-center gap-1">
            <span>🏠</span> Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link to="/products" className="text-gray-500 hover:text-secondary transition flex items-center gap-1">
            <span>🛒</span> Products
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">{product.product_name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
          <div className="md:flex">
            {/* Product Image Section */}
            <div className="md:w-1/2 p-8 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10">
              <div className="aspect-square bg-white rounded-3xl shadow-lg flex items-center justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 text-3xl opacity-50 animate-float">✨</div>
                <div className="absolute bottom-4 right-4 text-3xl opacity-50 animate-float" style={{ animationDelay: '0.5s' }}>🎁</div>
                
                <div className="relative z-10 text-center p-8">
                  <div className="w-40 h-40 mx-auto mb-4 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl flex items-center justify-center shadow-inner">
                    <span className="text-7xl">📦</span>
                  </div>
                  <p className="text-gray-400 text-sm">Product Image</p>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 p-8 lg:p-12">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-secondary/10 text-secondary">
                  📁 {product.category_id?.category_name || 'Uncategorized'}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.product_name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < 4 ? '' : 'grayscale opacity-30'}`}>⭐</span>
                  ))}
                </div>
                <span className="text-gray-500 font-medium">(4.0) · 128 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/10 rounded-2xl">
                <span className="text-4xl font-extrabold text-primary">${product.unit_price?.toFixed(2)}</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 line-through">${(product.unit_price * 1.25).toFixed(2)}</span>
                  <span className="text-sm font-bold text-secondary">You save 20%! 🎉</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                  📝 Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description || 'An amazing product that you\'ll absolutely love! Perfect for everyday use.'}
                </p>
              </div>

              {/* Supplier Info */}
              {product.supplier_id && (
                <div className="mb-8 p-5 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-2xl border-2 border-secondary/20">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                    🏭 Supplier Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span>🏢</span>
                      </div>
                      <div>
                        <span className="text-gray-800 font-bold text-lg">{product.supplier_id.supplier_name}</span>
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-secondary text-white">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                    {product.supplier_id.contact_person && (
                      <p className="text-gray-600 flex items-center gap-2 ml-13">
                        <span>👤</span> Contact: {product.supplier_id.contact_person}
                      </p>
                    )}
                    {product.supplier_id.email && (
                      <p className="text-gray-600 flex items-center gap-2 ml-13">
                        <span>📧</span> {product.supplier_id.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-14 text-gray-600 hover:bg-primary hover:text-white transition-all font-bold text-2xl"
                    >
                      −
                    </button>
                    <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-14 text-gray-600 hover:bg-secondary hover:text-white transition-all font-bold text-2xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <span>✓</span> In stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex-1 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 ${
                    addedToCart 
                      ? 'bg-secondary text-white' 
                      : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <span className="text-2xl">✓</span> Added to Cart!
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🛒</span> Add to Cart
                    </>
                  )}
                </button>
                <Link
                  to="/cart"
                  className="px-8 py-4 bg-accent/20 text-gray-800 rounded-2xl hover:bg-accent transition-all duration-300 font-bold flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🛒</span> View Cart
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t-2 border-gray-100">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-secondary/5 rounded-2xl">
                    <div className="text-3xl mb-2">💎</div>
                    <span className="text-sm font-bold text-gray-700">Premium Quality</span>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-2xl">
                    <div className="text-3xl mb-2">⚡</div>
                    <span className="text-sm font-bold text-gray-700">Fast Delivery</span>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-2xl">
                    <div className="text-3xl mb-2">🔒</div>
                    <span className="text-sm font-bold text-gray-700">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductDetails;

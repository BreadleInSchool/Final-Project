import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-9xl mb-6 animate-bounce">🛒</div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Your Cart is Empty!</h1>
          <p className="text-gray-500 text-lg mb-8">Looks like you haven't added anything yet. Let's fix that! 🎉</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>🛍️</span> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
              <span className="text-5xl">🛒</span> Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'} ready for checkout</p>
          </div>
          <button
            onClick={clearCart}
            className="px-6 py-3 bg-primary/10 text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <span>🗑️</span> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 hover:border-secondary transition-all duration-300">
                <div className="flex items-center gap-6">
                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📦</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.product_name}</h3>
                    <p className="text-secondary font-bold text-lg">${item.unit_price?.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="w-10 h-10 text-gray-600 hover:bg-primary hover:text-white transition-all font-bold"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-10 h-10 text-gray-600 hover:bg-secondary hover:text-white transition-all font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-2xl font-extrabold text-gray-800">${(item.unit_price * item.quantity).toFixed(2)}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>📋</span> Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-secondary">FREE 🎉</span>
                </div>
                <div className="border-t-2 border-dashed border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-extrabold text-primary">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Proceed to Checkout 🚀
              </Link>

              <div className="mt-6 p-4 bg-accent/20 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Secure Checkout</p>
                    <p className="text-gray-500 text-xs">Your data is safe with us!</p>
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

export default Cart;

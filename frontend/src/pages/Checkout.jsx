import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../utils/axios';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Payment Form State
    const [paymentInfo, setPaymentInfo] = useState({
        paymentMethod: 'credit_card',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Basic validation simulation
            if (paymentInfo.paymentMethod === 'credit_card') {
                if (!paymentInfo.cardNumber || !paymentInfo.cvv || !paymentInfo.expiry) {
                    throw new Error('Please fill in all card details');
                }
            }

            const orderData = {
                total_amount: getCartTotal(),
                items: cart.map(item => ({
                    product_id: item._id,
                    quantity: item.quantity,
                    price: item.unit_price
                })),
                payment_method: paymentInfo.paymentMethod,
                shipping_address: '123 Test St',
            };

            await axios.post('/orders', orderData);

            clearCart();
            setStep(3); // Success step
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="text-9xl mb-6">🛒</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty!</h1>
                    <Link 
                        to="/products" 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold hover:shadow-xl transition-all"
                    >
                        <span>🛍️</span> Go Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Success Screen
    if (step === 3) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                    <div className="w-32 h-32 mx-auto mb-6 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-7xl">🎉</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Order Placed!</h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Thank you for your purchase! Your order is being processed and will be shipped soon. 🚀
                    </p>
                    <div className="space-y-4">
                        <Link 
                            to="/dashboard" 
                            className="block w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                        >
                            View My Orders 📦
                        </Link>
                        <Link 
                            to="/products" 
                            className="block w-full px-8 py-4 bg-gray-100 text-gray-800 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                        >
                            Continue Shopping 🛍️
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
                        <span className="text-5xl">💳</span> Checkout
                    </h1>
                    <p className="text-gray-500 mt-2">You're almost there! Complete your purchase below.</p>
                </div>

                {/* Progress Steps */}
                <div className="max-w-2xl mx-auto mb-10">
                    <div className="flex items-center justify-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 1 ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'}`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</span>
                            <span className="font-semibold">Review</span>
                        </div>
                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full bg-secondary transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 2 ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'}`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</span>
                            <span className="font-semibold">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Order Summary */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span>📦</span> Order Summary
                        </h2>
                        <div className="space-y-4 mb-6">
                            {cart.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800">{item.product_name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-gray-800">${(item.unit_price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-secondary font-semibold">FREE 🎉</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-primary">${getCartTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span>💳</span> Payment Details
                        </h2>
                        <form onSubmit={handleCheckout} className="space-y-5">
                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentInfo({...paymentInfo, paymentMethod: 'credit_card'})}
                                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                                            paymentInfo.paymentMethod === 'credit_card' 
                                                ? 'border-secondary bg-secondary/5' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="text-2xl">💳</span>
                                        <span className="font-semibold">Credit Card</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentInfo({...paymentInfo, paymentMethod: 'paypal'})}
                                        className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                                            paymentInfo.paymentMethod === 'paypal' 
                                                ? 'border-secondary bg-secondary/5' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="text-2xl">🅿️</span>
                                        <span className="font-semibold">PayPal</span>
                                    </button>
                                </div>
                            </div>

                            {paymentInfo.paymentMethod === 'credit_card' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Name on Card</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={paymentInfo.cardName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentInfo.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={paymentInfo.expiry}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={paymentInfo.cvv}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="123"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentInfo.paymentMethod === 'paypal' && (
                                <div className="p-6 bg-blue-50 rounded-xl text-center">
                                    <span className="text-4xl mb-3 block">🅿️</span>
                                    <p className="text-gray-600">You'll be redirected to PayPal to complete your payment.</p>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-primary/10 border-2 border-primary/20 rounded-xl text-primary text-center font-semibold">
                                    ⚠️ {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                    loading 
                                        ? 'bg-gray-300 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-2xl hover:scale-[1.02]'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <span>🔒</span> Pay ${getCartTotal().toFixed(2)}
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                🔒 Your payment is secured with 256-bit SSL encryption
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

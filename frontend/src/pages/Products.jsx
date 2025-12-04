import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data.products || []);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.unit_price - b.unit_price;
            case 'price-high':
                return b.unit_price - a.unit_price;
            case 'name':
                return a.product_name.localeCompare(b.product_name);
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-secondary/30"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-secondary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                    </div>
                    <p className="text-gray-600 text-lg">Finding awesome stuff... ✨</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-7xl mb-4 animate-bounce">😢</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-primary text-lg mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all"
                    >
                        Try Again 🔄
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-primary via-secondary to-accent text-white py-20 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 text-5xl opacity-30 animate-float">🛒</div>
                <div className="absolute top-20 right-20 text-4xl opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>🎁</div>
                <div className="absolute bottom-10 left-1/4 text-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>⭐</div>
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                        🎉 New arrivals every week!
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Our Products</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Handpicked goodies from amazing suppliers. Find your next favorite thing! 😍
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Toolbar */}
                <div className="bg-white rounded-3xl shadow-lg p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                            <span className="text-xl">📦</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-800 text-lg">{products.length}</span>
                            <span className="text-gray-500 ml-1">Products found</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-500 font-medium">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary bg-white font-medium transition-all"
                            >
                                <option value="default">✨ Featured</option>
                                <option value="price-low">💰 Price: Low to High</option>
                                <option value="price-high">💸 Price: High to Low</option>
                                <option value="name">🔤 Name: A to Z</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-secondary text-white' : 'bg-white text-gray-500 hover:bg-secondary/10'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 transition-all ${viewMode === 'list' ? 'bg-secondary text-white' : 'bg-white text-gray-500 hover:bg-secondary/10'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {sortedProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6 animate-bounce">🛍️</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Yet!</h3>
                        <p className="text-gray-500 text-lg">We're stocking up on amazing stuff. Check back soon! 🚀</p>
                    </div>
                ) : (
                    <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                        {sortedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                {products.length > 0 && (
                    <div className="mt-16 text-center p-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl">
                        <div className="text-4xl mb-4">🤔</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Can't find what you're looking for?</h3>
                        <p className="text-gray-600 mb-6">We're here to help! Reach out and we'll find it for you.</p>
                        <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Contact Us 💬
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

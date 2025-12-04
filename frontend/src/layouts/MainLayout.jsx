import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                {/* Fun Wave Divider */}
                <div className="relative">
                    <svg className="absolute -top-1 left-0 w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#1F2937"/>
                    </svg>
                </div>

                <div className="container mx-auto px-4 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                                    <span className="text-xl">🛍️</span>
                                </div>
                                <span className="text-2xl font-bold">Trendora</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Your one-stop shop for amazing products! We bring joy to your doorstep with quality items and stellar service. ✨
                            </p>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                                    <span>📘</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                                    <span>📸</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                                    <span>🐦</span>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-secondary">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">🏠 Home</a></li>
                                <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">🛒 Shop</a></li>
                                <li><a href="/cart" className="text-gray-400 hover:text-white transition-colors">🛍️ Cart</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-bold text-lg mb-4 text-primary">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">❓ FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">📞 Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">🚚 Shipping Info</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Trendora. Made with 💖 for happy shoppers!
                        </p>
                        <div className="flex gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

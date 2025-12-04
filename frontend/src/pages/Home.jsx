import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-white to-secondary/10">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl animate-float">🛍️</div>
        <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-40 left-1/4 text-4xl animate-float" style={{ animationDelay: '1s' }}>🎁</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>💫</div>
        
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/30 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
              <span className="text-xl">🎉</span>
              <span className="text-sm font-medium text-gray-600">Free shipping on orders over $50!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Trendora
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing products that bring joy to your life! 
              <span className="text-primary font-semibold"> Quality</span>,
              <span className="text-secondary font-semibold"> Style</span>, and
              <span className="text-accent font-semibold"> Happiness</span> delivered to your door 🚀
            </p>

            {user ? (
              <div className="space-y-4">
                <p className="text-2xl mb-4">
                  Hey <span className="font-bold text-primary">{user.first_name || user.username}</span>! 👋 Ready to find something amazing?
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Let's Go Shopping</span>
                  <span className="text-xl">→</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>🛒</span>
                  <span>Start Shopping</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-gray-800 border-2 border-secondary px-10 py-4 rounded-full text-lg font-bold hover:bg-secondary hover:text-white hover:shadow-2xl transition-all duration-300"
                >
                  <span>✨</span>
                  <span>Join for Free</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Shop With Us? <span className="text-primary">🤔</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We're not just another store – we're your shopping bestie!
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary hover:to-primary/90 transition-all duration-500 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Super Fast Delivery</h3>
              <p className="text-gray-600 group-hover:text-white/80 transition-colors">
                Lightning-speed shipping to get your goodies to you ASAP!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary hover:to-secondary/90 transition-all duration-500 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                💎
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">Premium Quality</h3>
              <p className="text-gray-600 group-hover:text-white/80 transition-colors">
                Only the best products from trusted suppliers make it to our store!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/20 hover:from-accent hover:to-accent/90 transition-all duration-500 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                💖
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gray-800 transition-colors">Happy Customers</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                Your satisfaction is our superpower! We're here to make you smile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Treat Yourself? 🎁
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Life's too short for boring shopping. Let's find something amazing together!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-white text-gray-800 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>Explore All Products</span>
            <span className="text-2xl">🚀</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
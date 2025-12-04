import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/products', label: 'Products', icon: '📦' },
        { path: '/admin/orders', label: 'Orders', icon: '📄' },
        { path: '/admin/categories', label: 'Categories', icon: '📁' },
        { path: '/admin/suppliers', label: 'Suppliers', icon: '🏭' },
        { path: '/admin/customers', label: 'Customers', icon: '👥' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">👑</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Trendora</h1>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-grow p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                isActive(item.path)
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary text-white py-3 px-4 rounded-xl font-bold transition-all duration-300"
                    >
                        <span>👋</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;

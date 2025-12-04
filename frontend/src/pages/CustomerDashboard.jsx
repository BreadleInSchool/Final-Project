import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const CustomerDashboard = () => {
    const { user, updateProfile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const result = await updateProfile(user._id, formData);
        if (result.success) {
            setIsEditing(false);
            alert('Profile updated successfully');
        } else {
            alert(result.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/orders');
            const allOrders = response.data.orders || [];
            const myOrders = allOrders.filter(order =>
                (typeof order.customer_id === 'object' ? order.customer_id._id : order.customer_id) === user._id
            );

            setOrders(myOrders);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch orders', err);
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusEmoji = (status) => {
        switch (status) {
            case 'completed': return '✅';
            case 'pending': return '⏳';
            case 'processing': return '🔄';
            case 'cancelled': return '❌';
            default: return '📋';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading your account...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                        <span className="text-5xl">👋</span> Welcome back, {user?.first_name || user?.username}!
                    </h1>
                    <p className="text-gray-500 mt-2">Manage your profile and track your orders</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-4xl font-bold text-white">
                                    {user?.first_name?.charAt(0) || user?.username?.charAt(0) || '?'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                                <p className="text-gray-500">Your personal details</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                                isEditing 
                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105'
                            }`}
                        >
                            {isEditing ? (
                                <><span>✖️</span> Cancel</>
                            ) : (
                                <><span>✏️</span> Edit Profile</>
                            )}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">First Name</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👤</span>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Last Name</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👤</span>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Phone</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📱</span>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Address</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🏠</span>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            placeholder="123 Main Street"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>💾</span> Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">👤</span>
                                    <label className="text-sm font-bold text-gray-500">Username</label>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 pl-10">{user.username}</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">📧</span>
                                    <label className="text-sm font-bold text-gray-500">Email</label>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 pl-10">{user.email}</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">🏷️</span>
                                    <label className="text-sm font-bold text-gray-500">Full Name</label>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 pl-10">
                                    {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : 'Not set'}
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">📱</span>
                                    <label className="text-sm font-bold text-gray-500">Phone</label>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 pl-10">{user.phone || 'Not set'}</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-5 md:col-span-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">🏠</span>
                                    <label className="text-sm font-bold text-gray-500">Address</label>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 pl-10">{user.address || 'Not set'}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="text-3xl">📦</span> Order History
                        </h2>
                        <p className="text-gray-500 mt-1">Track all your past orders</p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-5xl">🛍️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                            <a 
                                href="/products" 
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-xl transition-all"
                            >
                                <span>🛒</span> Browse Products
                            </a>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center">
                                                <span className="text-2xl">📦</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">Order #{order._id.slice(-6)}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(order.order_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="text-xl font-bold text-primary">${order.total_amount}</p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusStyle(order.order_status)}`}>
                                                {getStatusEmoji(order.order_status)} {order.order_status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;

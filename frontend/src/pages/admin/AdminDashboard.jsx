import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from '../../utils/axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ orders: 0, products: 0, customers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');
                const config = { headers: { Authorization: `Bearer ${adminToken}` } };
                const response = await axios.get('/admin/stats', config);
                setStats(response.data.stats);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch stats', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading dashboard...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                    <span className="text-5xl">📊</span> Dashboard
                </h1>
                <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-primary transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-4xl">📄</span>
                        </div>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Orders</span>
                    </div>
                    <p className="text-5xl font-extrabold text-gray-800 mb-2">{stats.orders}</p>
                    <p className="text-gray-500">Total Orders</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-secondary transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-4xl">📦</span>
                        </div>
                        <span className="text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">Products</span>
                    </div>
                    <p className="text-5xl font-extrabold text-gray-800 mb-2">{stats.products}</p>
                    <p className="text-gray-500">Total Products</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-accent transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-4xl">👥</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700 bg-accent/30 px-3 py-1 rounded-full">Customers</span>
                    </div>
                    <p className="text-5xl font-extrabold text-gray-800 mb-2">{stats.customers}</p>
                    <p className="text-gray-500">Total Customers</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span>⚡</span> Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/admin/products" className="p-4 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-all text-center group">
                        <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">➕</span>
                        <span className="font-semibold text-gray-700">Add Product</span>
                    </a>
                    <a href="/admin/orders" className="p-4 bg-secondary/5 rounded-2xl hover:bg-secondary/10 transition-all text-center group">
                        <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📝</span>
                        <span className="font-semibold text-gray-700">View Orders</span>
                    </a>
                    <a href="/admin/categories" className="p-4 bg-accent/10 rounded-2xl hover:bg-accent/20 transition-all text-center group">
                        <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📁</span>
                        <span className="font-semibold text-gray-700">Categories</span>
                    </a>
                    <a href="/admin/suppliers" className="p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all text-center group">
                        <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🏭</span>
                        <span className="font-semibold text-gray-700">Suppliers</span>
                    </a>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

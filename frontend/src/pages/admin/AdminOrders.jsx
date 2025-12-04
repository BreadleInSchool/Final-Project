import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from '../../utils/axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            };

            const response = await axios.get('/orders', config);
            setOrders(response.data.orders || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch orders');
            setLoading(false);
            console.error(err);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            };

            await axios.put(`/orders/${orderId}`, { order_status: newStatus }, config);
            fetchOrders();
        } catch (err) {
            alert('Failed to update status');
            console.error(err);
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
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading orders...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-primary/10 border-2 border-primary/20 rounded-3xl p-8 text-center">
                    <span className="text-6xl block mb-4">⚠️</span>
                    <p className="text-primary font-bold text-lg">{error}</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                    <span className="text-5xl">📄</span> Orders
                </h1>
                <p className="text-gray-500 mt-2">Track and manage customer orders</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-100">
                    <span className="text-2xl">⏳</span>
                    <p className="text-2xl font-bold text-yellow-700">{orders.filter(o => o.order_status === 'pending').length}</p>
                    <p className="text-yellow-600 text-sm font-medium">Pending</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-100">
                    <span className="text-2xl">🔄</span>
                    <p className="text-2xl font-bold text-blue-700">{orders.filter(o => o.order_status === 'processing').length}</p>
                    <p className="text-blue-600 text-sm font-medium">Processing</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-100">
                    <span className="text-2xl">✅</span>
                    <p className="text-2xl font-bold text-green-700">{orders.filter(o => o.order_status === 'completed').length}</p>
                    <p className="text-green-600 text-sm font-medium">Completed</p>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100">
                    <span className="text-2xl">❌</span>
                    <p className="text-2xl font-bold text-red-700">{orders.filter(o => o.order_status === 'cancelled').length}</p>
                    <p className="text-red-600 text-sm font-medium">Cancelled</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span>📋</span> All Orders ({orders.length})
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                            #{order._id.slice(-6)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                                                <span>👤</span>
                                            </div>
                                            <span className="font-medium text-gray-800">{order.customer_id?.username || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-lg font-bold text-secondary">${order.total_amount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-bold border ${getStatusStyle(order.order_status)}`}>
                                            {getStatusEmoji(order.order_status)} {order.order_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(order.order_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.order_status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none transition-colors"
                                        >
                                            <option value="pending">⏳ Pending</option>
                                            <option value="processing">🔄 Processing</option>
                                            <option value="completed">✅ Completed</option>
                                            <option value="cancelled">❌ Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;

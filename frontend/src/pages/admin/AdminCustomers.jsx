import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from '../../utils/axios';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            const response = await axios.get('/customers', config);
            setCustomers(response.data.customers || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch customers', err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading customers...</p>
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
                    <span className="text-5xl">👥</span> Customers
                </h1>
                <p className="text-gray-500 mt-2">View and manage your customer base</p>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-secondary to-primary p-6 rounded-3xl mb-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl">🎉</span>
                    </div>
                    <div>
                        <p className="text-4xl font-extrabold">{customers.length}</p>
                        <p className="text-white/80 font-medium">Total Customers</p>
                    </div>
                </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((cust) => (
                    <div key={cust._id} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-secondary transition-all duration-300 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-2xl font-bold text-primary">
                                    {cust.first_name?.charAt(0) || cust.username?.charAt(0) || '?'}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">
                                    {cust.first_name && cust.last_name 
                                        ? `${cust.first_name} ${cust.last_name}` 
                                        : cust.username}
                                </h3>
                                <p className="text-secondary font-medium text-sm">@{cust.username}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>📧</span>
                                <span className="truncate">{cust.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>📅</span>
                                <span>Joined {new Date(cust.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {customers.length === 0 && (
                <div className="text-center py-16">
                    <span className="text-6xl block mb-4">👥</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No customers yet</h3>
                    <p className="text-gray-500">Customers will appear here once they register!</p>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminCustomers;

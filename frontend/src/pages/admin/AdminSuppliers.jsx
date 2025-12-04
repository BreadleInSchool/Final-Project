import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from '../../utils/axios';

const AdminSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        supplier_name: '',
        contact_name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            const response = await axios.get('/suppliers', config);
            setSuppliers(response.data.suppliers || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch suppliers', err);
            setLoading(false);
        }
    };

    const handleAddSupplier = async (e) => {
        e.preventDefault();
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.post('/suppliers', newSupplier, config);
            setNewSupplier({ supplier_name: '', contact_name: '', email: '', phone: '' });
            fetchSuppliers();
        } catch (err) {
            alert('Failed to add supplier');
        }
    };

    const handleDeleteSupplier = async (id) => {
        if (!window.confirm('Are you sure you want to delete this supplier?')) return;
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.delete(`/suppliers/${id}`, config);
            fetchSuppliers();
        } catch (err) {
            alert('Failed to delete supplier');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading suppliers...</p>
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
                    <span className="text-5xl">🏭</span> Suppliers
                </h1>
                <p className="text-gray-500 mt-2">Manage your product suppliers</p>
            </div>

            {/* Add Supplier Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span>➕</span> Add New Supplier
                </h2>
                <form onSubmit={handleAddSupplier} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Supplier Name</label>
                        <input
                            type="text"
                            placeholder="Company name"
                            value={newSupplier.supplier_name}
                            onChange={(e) => setNewSupplier({ ...newSupplier, supplier_name: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Contact Person</label>
                        <input
                            type="text"
                            placeholder="Contact name"
                            value={newSupplier.contact_name}
                            onChange={(e) => setNewSupplier({ ...newSupplier, contact_name: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="email@company.com"
                            value={newSupplier.email}
                            onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Phone</label>
                        <input
                            type="text"
                            placeholder="+1 (555) 000-0000"
                            value={newSupplier.phone}
                            onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="md:col-span-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span>✨</span> Add Supplier
                    </button>
                </form>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suppliers.map((sup) => (
                    <div key={sup._id} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-secondary transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-3xl">🏢</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{sup.supplier_name}</h3>
                                    <p className="text-secondary font-medium">{sup.contact_name || 'No contact'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteSupplier(sup._id)}
                                className="opacity-0 group-hover:opacity-100 bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-xl transition-all duration-300"
                            >
                                🗑️
                            </button>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>📧</span>
                                <span>{sup.email || 'No email'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>📞</span>
                                <span>{sup.phone || 'No phone'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {suppliers.length === 0 && (
                <div className="text-center py-16">
                    <span className="text-6xl block mb-4">🏭</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No suppliers yet</h3>
                    <p className="text-gray-500">Add your first supplier above!</p>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminSuppliers;

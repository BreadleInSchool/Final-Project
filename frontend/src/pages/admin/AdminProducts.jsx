import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from '../../utils/axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        category_id: '',
        supplier_id: '',
        unit_price: '',
        cost_price: '',
        reorder_level: '',
        is_active: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };

            const [prodRes, catRes, supRes] = await Promise.all([
                axios.get('/products'),
                axios.get('/categories'),
                axios.get('/suppliers', config)
            ]);

            setProducts(prodRes.data.products || []);
            setCategories(catRes.data.categories || []);
            setSuppliers(supRes.data.suppliers || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data', err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };

            await axios.post('/products', formData, config);

            setFormData({
                product_name: '',
                description: '',
                category_id: '',
                supplier_id: '',
                unit_price: '',
                cost_price: '',
                reorder_level: '',
                is_active: true
            });

            fetchData();
        } catch (err) {
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.delete(`/products/${id}`, config);
            fetchData();
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading products...</p>
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
                    <span className="text-5xl">📦</span> Products
                </h1>
                <p className="text-gray-500 mt-2">Add and manage your product catalog</p>
            </div>

            {/* Add Product Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span>➕</span> Add New Product
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={formData.product_name}
                            onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
                        <select
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.category_name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Supplier</label>
                        <select
                            value={formData.supplier_id}
                            onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map(s => <option key={s._id} value={s._id}>{s.supplier_name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Unit Price ($)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={formData.unit_price}
                            onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-2">Cost Price ($)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={formData.cost_price}
                            onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-600 mb-2">Description</label>
                        <input
                            type="text"
                            placeholder="Product description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="md:col-span-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span>✨</span> Add Product
                    </button>
                </form>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span>📋</span> Product List ({products.length})
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((prod) => (
                                <tr key={prod._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <span>📦</span>
                                            </div>
                                            <span className="font-semibold text-gray-800">{prod.product_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-lg font-bold text-secondary">${prod.unit_price}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {typeof prod.category_id === 'object'
                                                ? prod.category_id?.category_name
                                                : categories.find(c => c._id === prod.category_id)?.category_name || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(prod._id)}
                                            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                                        >
                                            🗑️ Delete
                                        </button>
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

export default AdminProducts;

import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from '../../utils/axios';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ category_name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/categories');
            setCategories(response.data.categories || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch categories');
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.post('/categories', newCategory, config);
            setNewCategory({ category_name: '', description: '' });
            fetchCategories();
        } catch (err) {
            alert('Failed to add category');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            const adminToken = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.delete(`/categories/${id}`, config);
            fetchCategories();
        } catch (err) {
            alert('Failed to delete category');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading categories...</p>
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
                    <span className="text-5xl">📁</span> Categories
                </h1>
                <p className="text-gray-500 mt-2">Organize your products into categories</p>
            </div>

            {/* Add Category Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span>➕</span> Add New Category
                </h2>
                <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.category_name}
                            onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Description (optional)"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                    >
                        <span>✨</span> Add
                    </button>
                </form>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div key={cat._id} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-secondary transition-all duration-300 group">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">📂</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{cat.category_name}</h3>
                                    <p className="text-gray-500 text-sm">{cat.description || 'No description'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteCategory(cat._id)}
                                className="opacity-0 group-hover:opacity-100 bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-xl transition-all duration-300"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-16">
                    <span className="text-6xl block mb-4">📂</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No categories yet</h3>
                    <p className="text-gray-500">Add your first category above!</p>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminCategories;

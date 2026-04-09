import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Monitor, Laptop, Cpu, HardDrive, ShoppingCart, TrendingUp, Shield, Truck } from 'lucide-react';

// Product columns
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            // Display only first 6 products as featured
            setProducts(response.data.slice(0, 6));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Laptops', icon: Laptop, color: 'bg-blue-500' },
        { name: 'Desktops', icon: Monitor, color: 'bg-purple-500' },
        { name: 'Components', icon: Cpu, color: 'bg-green-500' },
        { name: 'Storage', icon: HardDrive, color: 'bg-orange-500' }
    ];

    const features = [
        { icon: TrendingUp, title: 'Best Prices', description: 'Competitive pricing on all products' },
        { icon: Shield, title: 'Warranty', description: 'Full warranty on all items' },
        { icon: Truck, title: 'Fast Shipping', description: 'Quick delivery nationwide' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">Welcome to ItStore</h1>
                        <p className="text-xl mb-8 text-blue-100">Your Premier IT Store for All Technology Needs</p>
                        <div className="flex gap-4 justify-center">
                            <button 
                                onClick={() => navigate('/products/list')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Shop Now
                            </button>
                            <button 
                                onClick={() => navigate('/about')}
                                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-400"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Browse Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div 
                                key={index}
                                onClick={() => navigate('/products/list')}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                            >
                                <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                                    <Icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
                        <button 
                            onClick={() => navigate('/products/list')}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            View All →
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading products...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-4">No products available yet</p>
                            <button 
                                onClick={() => navigate('/products/new')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Add Your First Product
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div 
                                    key={product.id}
                                    className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden"
                                >
                                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden relative">
                                        {product.imageUrl ? (
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                    if (fallback) fallback.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div 
                                            className="absolute inset-0 flex items-center justify-center"
                                            style={{ display: product.imageUrl ? 'none' : 'flex' }}
                                        >
                                            <Monitor className="text-gray-400" size={80} />
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-blue-600">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <button 
                                                onClick={() => navigate('/products/list')}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                            >
                                                <ShoppingCart size={18} />
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose ItStore?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-white" size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Tech?</h2>
                    <p className="text-xl mb-8 text-blue-100">Explore our full collection of premium IT products</p>
                    <button 
                        onClick={() => navigate('/products/list')}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Browse All Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
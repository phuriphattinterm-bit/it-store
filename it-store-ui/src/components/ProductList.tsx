import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import { fetchProducts, deleteProducts, selectProducts, selectLoading, selectError, type Product } from '../store/productSlice';
import ProductForm from './ProductForm';
import { Package, Edit2, Trash2, DollarSign, AlertCircle, Loader, ShoppingBag, ShoppingCart, Search, X } from 'lucide-react';

interface ProductListProps {
    isAuthenticated: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ isAuthenticated }) => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [editingProduct, setEditingProducts] = useState<Product | undefined>(undefined);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleEdit = (product: Product) => {
        setEditingProducts(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingProducts(undefined);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setDeletingId(id);
            try {
                await dispatch(deleteProducts(id)).unwrap();
            } catch (error) {
                console.error('Failed to delete product:', error);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleBuy = (product: Product) => {
        alert(`Thank you for your interest in ${product.name}! This is a demo buy button.`);
    };

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.price.toString().includes(query)
        );
    });

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl m-6'>
                <Loader className="animate-spin text-blue-600 mb-4" size={48} />
                <p className='text-lg text-gray-600'>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-red-50 border-2 border-red-200 p-6 rounded-2xl m-6 flex items-center gap-4'>
                <AlertCircle className="text-red-600" size={32} />
                <div>
                    <h3 className='text-lg font-semibold text-red-800'>Error Loading Products</h3>
                    <p className='text-red-600'>{error}</p>
                </div>
            </div>
        );
    }

    if (!Array.isArray(products)) {
        return (
            <div className='bg-red-50 border-2 border-red-200 p-6 rounded-2xl m-6 flex items-center gap-4'>
                <AlertCircle className="text-red-600" size={32} />
                <p className='text-red-600'>Error: Received invalid data from the server.</p>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            {/* Editing Form Section - Only show if authenticated */}
            {isAuthenticated && editingProduct && (
                <div className='mb-8 animate-fadeIn'>
                    <ProductForm editingProduct={editingProduct} onCancelEdit={handleCancelEdit} />
                </div>
            )}

            {/* Product List Section */}
            <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
                    <div className='flex items-center gap-3'>
                        <ShoppingBag className="text-blue-600" size={32} />
                        <h2 className='text-3xl font-bold text-gray-800'>Product Inventory</h2>
                    </div>
                    <div className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold'>
                        {filteredProducts.length} of {products.length} {products.length === 1 ? 'Product' : 'Products'}
                    </div>
                </div>

                {/* Search Bar */}
                <div className='mb-6'>
                    <div className='relative'>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products by name, description, or price..."
                            className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/*If there is no product and can not find any product*/}
                {products.length === 0 ? (
                    <div className='text-center py-16 bg-gray-50 rounded-xl'>
                        <Package className="mx-auto text-gray-400 mb-4" size={64} />
                        <p className='text-xl text-gray-600 mb-2'>No products in inventory</p>
                        <p className='text-gray-500 mb-6'>Start by adding your first product!</p>
                        {isAuthenticated && (
                            <a 
                                href="/products/new" 
                                className='inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg'
                            >
                                Add Your First Product
                            </a>
                        )}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className='text-center py-16 bg-gray-50 rounded-xl'>
                        <Search className="mx-auto text-gray-400 mb-4" size={64} />
                        <p className='text-xl text-gray-600 mb-2'>No products match your search</p>
                        <p className='text-gray-500 mb-6'>Try adjusting your search terms</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg'
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className='grid gap-4'>
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-2 rounded-xl transition-all hover:shadow-lg ${
                                    editingProduct?.id === product.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                            >
                                <div className='flex-grow mb-4 sm:mb-0'>
                                    <div className='flex items-start gap-4'>
                                        <div className='flex-shrink-0'>
                                            {product.imageUrl ? (
                                                <img 
                                                    src={product.imageUrl} 
                                                    alt={product.name}
                                                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                        if (fallback) fallback.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div 
                                                className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-24 h-24 flex items-center justify-center'
                                                style={{ display: product.imageUrl ? 'none' : 'flex' }}
                                            >
                                                <Package className="text-white" size={32} />
                                            </div>
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div>
                                            <h3 className='text-xl font-bold text-gray-800 mb-1'>{product.name}</h3>
                                            <p className='text-gray-600 mb-2 leading-relaxed'>{product.description}</p>
                                            <div className='flex items-center gap-2 text-2xl font-bold text-blue-600'>
                                                <DollarSign size={24} />
                                                {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional buttons based on authentication */}
                                <div className='flex gap-2 w-full sm:w-auto'>
                                    {isAuthenticated ? (
                                        <>
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className='flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg'
                                            >
                                                <Edit2 size={18} />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                disabled={deletingId === product.id}
                                                className='flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                                            >
                                                {deletingId === product.id ? (
                                                    <Loader className="animate-spin" size={18} />
                                                ) : (
                                                    <Trash2 size={18} />
                                                )}
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleBuy(product)}
                                            className='flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg'
                                        >
                                            <ShoppingCart size={18} />
                                            Buy Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
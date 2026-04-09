import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import { addProducts, updateProducts, type Product } from '../store/productSlice';
import { Package, DollarSign, FileText, Save, X, Plus, Image} from 'lucide-react';

interface ProductFormProps {
    editingProduct?: Product;
    onCancelEdit?: () => void;
    isAuthenticated?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ editingProduct, onCancelEdit}) => {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setProductName] = useState(editingProduct?.name || '');
    const [description, setDescription] = useState(editingProduct?.description || '');
    const [price, setPrice] = useState(editingProduct?.price || 0);
    const [imageUrl, setImageUrl] = useState(editingProduct?.imageUrl || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        

        setIsSubmitting(true);
        try {
            if (editingProduct) {
                await dispatch(updateProducts({ 
                    id: editingProduct.id, 
                    name, 
                    description, 
                    price,
                    imageUrl 
                })).unwrap();
                if (onCancelEdit) onCancelEdit();
            } else {
                await dispatch(addProducts({ 
                    name, 
                    description, 
                    price,
                    imageUrl 
                })).unwrap();
                setProductName('');
                setDescription('');
                setPrice(0);
                setImageUrl('');
            }
        } catch (error) {
            console.error('Failed to save the product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
            <div className='flex items-center justify-between mb-6'>
                {editingProduct && (
                    <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold'>
                        Editing Mode
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Product Name */}
                <div className='group'>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <Package size={18} className="text-gray-500" />
                        Product Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., Dell XPS 15 Laptop"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                {/* Description */}
                <div className='group'>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <FileText size={18} className="text-gray-500" />
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the product features and specifications..."
                        rows={4}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        required
                    />
                </div>

                {/* Price */}
                <div className='group'>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <DollarSign size={18} className="text-gray-500" />
                        Price (USD)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="0.00"
                            className="w-full p-3 pl-8 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                            min="1"
                            step="0.01"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div className='group'>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        <Image size={18} className="text-gray-500" />
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/product-image.jpg"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {imageUrl && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                            <div className="border-2 border-gray-200 rounded-lg p-2 bg-gray-50">
                                <img 
                                    src={imageUrl} 
                                    alt="Preview" 
                                    className="max-h-48 mx-auto rounded-lg object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '';
                                        e.currentTarget.alt = 'Invalid image URL';
                                        e.currentTarget.className = 'hidden';
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Buttons */}
                <div className='flex gap-3 pt-2'>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-grow py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md ${
                            editingProduct
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                {editingProduct ? <Save size={20} /> : <Plus size={20} />}
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </>
                        )}
                    </button>

                    {editingProduct && onCancelEdit && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="py-3 px-6 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <X size={20} />
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
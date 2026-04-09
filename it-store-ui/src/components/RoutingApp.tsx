import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home as HomeIcon, Info, Package, Plus, Menu, X, ShoppingBag , LogIn, LogOut} from 'lucide-react';
import Home from './Home';
import About from './About';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProtectedRoute from './ProtectedRoute';

const RoutingApp: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                {/* Enhanced Navigation Bar */}
                <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo/Brand */}
                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="bg-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                                    <ShoppingBag className="text-blue-600" size={24} />
                                </div>
                                <span className="text-white text-2xl font-bold hidden sm:block">ItStore</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <ul className="hidden md:flex space-x-1">
                                <li>
                                    <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                                        <HomeIcon size={18} />
                                        <span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                                        <Info size={18} />
                                        <span>About</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products/list" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                                        <Package size={18} />
                                        <span>Products</span>
                                    </Link>
                                </li>
                                {isAuthenticated && (
                                    <li>
                                        <Link to="/products/new" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <Plus size={18} />
                                            <span>Add Product</span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    {isAuthenticated ? (
                                        <button onClick={() => setIsAuthenticated(false)} className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <LogOut size={18}/>
                                            Log Out
                                        </button>
                                    ) : (
                                        <button onClick={() => setIsAuthenticated(true)} className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <LogIn size={18}/>
                                            Log In
                                        </button>
                                    )}
                                </li>
                            </ul>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        {mobileMenuOpen && (
                            <div className="md:hidden pb-4">
                                <ul className="space-y-2">
                                    <li>
                                        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <HomeIcon size={20} />
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <Info size={20} />
                                            <span>About</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/products/list" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <Package size={20} />
                                            <span>Products</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/products/new" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all">
                                            <Plus size={20} />
                                            <span>Add Product</span>
                                        </Link>
                                    </li>
                                    <li>
                                        {isAuthenticated ? (
                                            <button onClick={() => { setIsAuthenticated(false); setMobileMenuOpen(false); }} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all w-full text-left">
                                                Log Out
                                            </button>
                                        ) : (
                                            <button onClick={() => { setIsAuthenticated(true); setMobileMenuOpen(false); }} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all w-full text-left">
                                                Log In
                                            </button>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Main Content */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/products/list' element={<ProductList isAuthenticated={isAuthenticated} />} />
                    <Route 
                        path='/products/new' 
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ProductForm isAuthenticated={isAuthenticated} />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <ShoppingBag className="text-blue-400" size={24} />
                                    <span className="text-xl font-bold">ItStore</span>
                                </div>
                                <p className="text-gray-400">Your trusted IT store for premium technology products.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                                    <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                    <li><Link to="/products/list" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                                <p className="text-gray-400">Email: info@ItStore.com</p>
                                <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                            <p>© 2025 ItStore. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
};

export default RoutingApp;

import React from 'react';
import {Users, Zap, Clock, Globe } from 'lucide-react';
// ^ Import logos

const About: React.FC = () => {
    const stats = [
        { label: 'Products', value: '500+', icon: Zap },
        { label: 'Happy Customers', value: '10K+', icon: Users },
        { label: 'Years in Business', value: '15+', icon: Clock },
        { label: 'Countries Served', value: '25+', icon: Globe }
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-6">About ItStore</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Your trusted partner in technology since 2010. We're passionate about bringing the latest and greatest tech products to customers worldwide.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-blue-600" size={32} />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                ItStore was born from a simple idea: make premium technology accessible to everyone. What started as a small computer shop in 2010 has grown into a leading IT retailer serving customers across the globe.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We've built our reputation on three pillars: quality products, exceptional service, and competitive prices. Our team of tech enthusiasts works tirelessly to curate the best selection of computers, components, and accessories.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Today, we're proud to serve over 10,000 satisfied customers and continue to grow our product range to meet the evolving needs of tech enthusiasts, professionals, and businesses alike.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-xl">
                            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-blue-100 leading-relaxed">
                                    Put something here?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Why Choose Us?</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        We're more than just an IT store. We're your technology partner, committed to your success.
                    </p>
                </div>
            </div>

            {/* Team/Contact CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        We'd love to hear from you! Reach out to our team for any questions or inquiries.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a 
                            href="mailto:info@techhub.com" 
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Contact Us
                        </a>
                        <a 
                            href="/products/list" 
                            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-400"
                        >
                            Browse Products
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
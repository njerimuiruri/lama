'use client';
import React from 'react';
import { Play, Eye, Clock, MapPin, Users, ArrowRight, Star, Award, Zap } from 'lucide-react';

const ImpactsPage = () => {
    const featuredImpact = {
        title: "Empowering Women-Led Climate Adaptation in Kenya",
        description: "Discover how local women's groups in rural Kenya are using community-driven adaptation indicators to secure climate finance and implement drought-resistant farming techniques that have increased crop yields by 40% while building community resilience.",
        location: "Turkana County, Kenya",
        duration: "8:45",
        views: "2.3K",
        category: "Community Leadership",
        thumbnail: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        highlights: [
            "40% increase in crop yields",
            "150+ women trained in adaptation metrics",
            "Community-led early warning system established",
            "$50K in climate finance secured"
        ]
    };

    const impactCategories = [
        {
            icon: Users,
            title: "Community Empowerment",
            count: "12 videos",
            description: "Stories of local communities leading their own adaptation initiatives",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Award,
            title: "Innovation Showcase",
            count: "8 videos",
            description: "Innovative locally-led adaptation solutions across Africa",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: Star,
            title: "Success Stories",
            count: "15 videos",
            description: "Measurable impacts and transformative community outcomes",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: Zap,
            title: "Youth Leadership",
            count: "6 videos",
            description: "Young people driving climate adaptation in their communities",
            color: "bg-orange-50 text-orange-600"
        }
    ];

    const relatedVideos = [
        {
            title: "Building Climate Resilience in Coastal Ghana",
            duration: "6:32",
            views: "1.8K",
            thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Indigenous Knowledge for Drought Management",
            duration: "7:21",
            views: "3.1K",
            thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Youth-Led Urban Adaptation in Nigeria",
            duration: "5:47",
            views: "2.7K",
            thumbnail: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-32 right-20 w-64 h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-32 left-20 w-72 h-72 bg-gradient-to-tr from-blue-50 to-sky-50 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-2 mb-8">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-700 text-sm font-medium">Impact Stories</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                Real <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Impact Stories</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
                                Witness the transformative power of locally led adaptation initiatives across Africa through compelling stories of resilience and innovation
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Impact Video */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Video Player */}
                                <div className="relative group">
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                        <img
                                            src={featuredImpact.thumbnail}
                                            alt={featuredImpact.title}
                                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                                                <Play className="w-8 h-8 text-green-600 ml-1" fill="currentColor" />
                                            </button>
                                        </div>

                                        {/* Video Info Overlay */}
                                        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white text-sm">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {featuredImpact.duration}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {featuredImpact.views} views
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute -top-4 left-4">
                                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            {featuredImpact.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                                        <MapPin className="w-4 h-4" />
                                        {featuredImpact.location}
                                    </div>

                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                        {featuredImpact.title}
                                    </h2>

                                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                        {featuredImpact.description}
                                    </p>

                                    {/* Key Highlights */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {featuredImpact.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-700 text-sm">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




            </div>
        </div>
    );
};

export default ImpactsPage;
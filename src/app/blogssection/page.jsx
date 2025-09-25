'use client';
import React from 'react';
import { Calendar, Clock, User, ArrowRight, Tag, Eye, Share2 } from 'lucide-react';

const BlogsPage = () => {
    const featuredBlogs = [
        {
            id: 1,
            title: "Building Climate Resilience Through Community-Led Adaptation Metrics",
            excerpt: "Explore how local communities across Africa are developing their own indicators to measure and track climate adaptation success, leading to more effective and sustainable interventions.",
            author: "Dr. Amina Kone",
            date: "September 20, 2025",
            readTime: "8 min read",
            category: "Research & Insights",
            image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: "2.1K",
            tags: ["Climate Adaptation", "Community Leadership", "Metrics"]
        },
        {
            id: 2,
            title: "The Power of Indigenous Knowledge in Modern Climate Solutions",
            excerpt: "Discover how traditional ecological knowledge is being integrated with modern climate science to create innovative adaptation strategies that respect cultural heritage while addressing contemporary challenges.",
            author: "Joseph Mburu",
            date: "September 18, 2025",
            readTime: "6 min read",
            category: "Traditional Knowledge",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: "1.8K",
            tags: ["Indigenous Knowledge", "Traditional Practices", "Innovation"]
        },
        {
            id: 3,
            title: "Youth-Led Climate Action: Transforming Communities from Within",
            excerpt: "Meet the young climate leaders across Africa who are driving transformative change in their communities through innovative adaptation projects and grassroots mobilization efforts.",
            author: "Sarah Ochieng",
            date: "September 15, 2025",
            readTime: "7 min read",
            category: "Youth Leadership",
            image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            views: "3.2K",
            tags: ["Youth Leadership", "Community Action", "Climate Change"]
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
                                <span className="text-green-700 text-sm font-medium">Latest Insights</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                Climate Adaptation <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Insights</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
                                Deep dives into locally-led adaptation approaches, community stories, and the latest research from across Africa
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Blogs Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Featured Articles
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Explore our latest insights on climate adaptation, community leadership, and sustainable development
                                </p>
                            </div>

                            {/* Blog Grid */}
                            <div className="grid lg:grid-cols-3 gap-8 mb-16">
                                {featuredBlogs.map((blog) => (
                                    <article key={blog.id} className="group cursor-pointer">
                                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                                            {/* Blog Image */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                        {blog.category}
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                                                    <Eye className="w-3 h-3 text-gray-600" />
                                                    <span className="text-xs text-gray-600">{blog.views}</span>
                                                </div>
                                            </div>

                                            {/* Blog Content */}
                                            <div className="p-6">
                                                {/* Meta Info */}
                                                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        {blog.author}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        {blog.readTime}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                    <Calendar className="w-4 h-4" />
                                                    {blog.date}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                                                    {blog.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                                    {blog.excerpt}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {blog.tags.map((tag, index) => (
                                                        <span key={index} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                                            <Tag className="w-3 h-3" />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Read More */}
                                                <div className="flex items-center justify-between">
                                                    <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 group/btn">
                                                        Read Article
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                                                        <Share2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* More Blogs Button */}
                            <div className="text-center">
                                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto group">
                                    <span>Explore More Articles</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default BlogsPage;
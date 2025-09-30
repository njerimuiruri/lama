'use client';
import React, { useState, useEffect } from 'react';
import {
    Users, Target, Globe, BarChart3, Heart, Lightbulb, ArrowRight, CheckCircle,
    Shield, Layers, Eye, CloudRain, Leaf, TrendingUp, MapPin, Award,
    Building, Book, Database, Settings, ChevronLeft, ChevronRight, Quote
} from 'lucide-react';
import LamaNavbar from '@/components/Navbar/navbar';
import LamaFooter from '@/components/Footer/footer';
import Link from 'next/link';

const AboutPage = () => {
    const [currentAdvisor, setCurrentAdvisor] = useState(0);

    const advisors = [
        {
            name: "Dr. Amina Hassan",
            role: "African Group of Negotiators Representative",
            background: "Climate Policy & International Relations",
            bio: "Leading expert in climate negotiations with over 15 years of experience representing African interests in international climate forums.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Prof. Kwame Asante",
            role: "Research & Academia Representative",
            background: "Climate Science & Adaptation Research",
            bio: "Renowned climate researcher focusing on adaptation strategies for vulnerable communities across Sub-Saharan Africa.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Sarah Mwangi",
            role: "Private Sector Representative",
            background: "Sustainable Finance & Climate Investments",
            bio: "Finance executive specializing in climate adaptation investments and sustainable development funding mechanisms.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Hon. Joseph Ochieng",
            role: "Government Representative",
            background: "Environmental Policy & Governance",
            bio: "Senior government official with extensive experience in environmental policy development and climate adaptation planning.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Fatima Al-Rashid",
            role: "Local Communities Representative",
            background: "Community Development & Grassroots Advocacy",
            bio: "Community leader advocating for locally-led adaptation initiatives and indigenous knowledge integration in climate solutions.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Dr. Emmanuel Tetteh",
            role: "Youth & Innovation Representative",
            background: "Climate Technology & Digital Solutions",
            bio: "Young innovator developing cutting-edge climate technologies and digital platforms for community-based adaptation monitoring.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Dr. Grace Nyong",
            role: "Gender & Social Inclusion Expert",
            background: "Women's Rights & Climate Justice",
            bio: "Advocate for gender-responsive climate adaptation policies and women's leadership in climate resilience initiatives.",
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Dr. Ahmed El-Mansouri",
            role: "Regional Integration Specialist",
            background: "African Union & Regional Cooperation",
            bio: "Expert in regional climate cooperation frameworks and continental adaptation strategies across African economic communities.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Maria Santos",
            role: "International Development Expert",
            background: "Climate Finance & Development Partnerships",
            bio: "International development specialist with expertise in climate finance mechanisms and multi-stakeholder partnership development.",
            image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Chief Kofi Mensah",
            role: "Traditional Authorities Representative",
            background: "Indigenous Knowledge & Cultural Preservation",
            bio: "Traditional leader championing the integration of indigenous climate knowledge with modern adaptation strategies.",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentAdvisor((prev) => (prev + 1) % advisors.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [advisors.length]);

    const nextAdvisor = () => {
        setCurrentAdvisor((prev) => (prev + 1) % advisors.length);
    };

    const prevAdvisor = () => {
        setCurrentAdvisor((prev) => (prev - 1 + advisors.length) % advisors.length);
    };

    const components = [
        {
            icon: BarChart3,
            title: "Interactive Dashboard",
            description: "The LAMA dashboard serves as a central hub for data visualization, analysis, and interaction. It incorporates local, sub-national, national, and global indicators related to adaptation, climate, and weather. The platform facilitates comparative analysis, enabling the co-creation of metrics that align local aspirations with broader adaptation policies and investments.",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Database,
            title: "LLA Interventions Database",
            description: "This component houses information on LLA projects and initiatives implemented across Africa. The database enables the comparison of lessons learned from different interventions, creating a comprehensive repository of adaptation experiences.",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: Settings,
            title: "Tools and Framework Repository",
            description: "The platform provides access to a variety of tools and frameworks employed by different initiatives to assess progress and track indicators. This repository ensures standardization and best practices across projects.",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: Users,
            title: "Stakeholder Engagement Platform",
            description: "A comprehensive stakeholder database including individuals and organizations involved in adaptation at both project and policy levels. These stakeholders form the LAMA Engagement Group, convening regularly to share insights on adaptation measurement.",
            color: "bg-orange-50 text-orange-600"
        },
        {
            icon: Award,
            title: "Metrics Advisory/Expert Group",
            description: "Composed of ten experts from diverse backgrounds including the African Group of Negotiators, research, private sector, government, and local communities. This group consolidates best practices and indicators while linking local metrics to national and international frameworks.",
            color: "bg-red-50 text-red-600"
        }
    ];

    const objectives = [
        {
            icon: Building,
            title: "Capacity Building",
            description: "Provide expert support to African countries and researchers to enhance their capacity to develop adaptation indicators that effectively capture local priorities in an inclusive manner.",
            highlight: "Expert Support"
        },
        {
            icon: Book,
            title: "Knowledge Sharing",
            description: "Facilitate the sharing of experiences and best practices in adaptation measurement among various projects and initiatives operating at the local level.",
            highlight: "Best Practices"
        },
        {
            icon: Globe,
            title: "Framework Development",
            description: "Consolidate knowledge and priorities regarding adaptation metrics in Africa, aligning them with national and global frameworks such as NAPs, NDCs, the GGA, and the GST.",
            highlight: "Global Alignment"
        }
    ];

    const relevancePoints = [
        {
            icon: Shield,
            title: "Equity and Inclusivity",
            description: "The LAMA dashboard provides space for dialogue and co-creation processes to map adequate granular indicators as presented by vulnerable groups. It captures metrics that are co-produced and strategic for measuring the distributional impact of climate change.",
            stats: "50% of 1.5B vulnerable people rely on farming"
        },
        {
            icon: TrendingUp,
            title: "Demonstrate Effectiveness",
            description: "The dashboard provides an interactive space for capturing already assessed adaptation solutions while providing room for actors to shape their initiatives to meet all the principles for adaptation and LLA.",
            stats: "$50B annual adaptation funding target"
        },
        {
            icon: Eye,
            title: "Tracking and Reporting",
            description: "Enables tracking and reporting on expenditures, reviews and integration with policy processes. It provides equitable LLA investment opportunities for the most vulnerable through easy-to-access linkages between budget allocation and expenses.",
            stats: "Real-time budget tracking capabilities"
        },
        {
            icon: Layers,
            title: "Sharing and Learning",
            description: "The dashboard provides a simplified format for presentation of the interplay between indicators, sectors, and budgets. It aims to provide key adaptation information to local communities, women, and young people across Africa.",
            stats: "One-stop shop for LLA resources"
        }
    ];

    return (
        <>
            <LamaNavbar />

            <div className="min-h-screen bg-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-16 sm:top-32 right-4 sm:right-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-2xl sm:blur-3xl opacity-40"></div>
                    <div className="absolute bottom-16 sm:bottom-32 left-4 sm:left-20 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-tr from-blue-50 to-sky-50 rounded-full blur-2xl sm:blur-3xl opacity-30"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-50 to-green-50 rounded-full blur-2xl sm:blur-3xl opacity-20"></div>
                </div>

                <div className="relative z-10">
                    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                    <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                                        <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-3 sm:px-4 py-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-green-700 text-xs sm:text-sm font-medium">About LAMA Platform</span>
                                        </div>

                                        <div>
                                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
                                                Locally Led Adaptation
                                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                                                    Metrics for Africa
                                                </span>
                                            </h1>

                                            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                                                <p>
                                                    African communities are among the most severely impacted by climate change, with about 50% of its 1.5 billion vulnerable people relying on farming for their primary livelihood.
                                                </p>
                                                <p className="hidden sm:block">
                                                    The LAMA Platform convenes diverse stakeholders engaged in LLA initiatives across Africa, facilitating the exchange of experiences, tools, and indicators to inform the Global Goal on Adaptation (GGA) and Global Stocktake (GST).
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">

                                            <Link href="/test" className="group">
                                                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3">
                                                    Explore Dashboard
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                                </button>
                                            </Link>

                                        </div>
                                    </div>

                                    <div className="relative order-1 lg:order-2">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl sm:rounded-3xl transform rotate-2 sm:rotate-3"></div>
                                        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl">
                                            <img
                                                src="https://images.unsplash.com/photo-1569438520635-a89e30b57ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                                alt="African communities adapting to climate change"
                                                className="rounded-xl sm:rounded-2xl w-full h-64 sm:h-80 object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Background Context Section - Responsive */}
                    <section className="py-12 sm:py-16 lg:py-20">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-12 sm:mb-16">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                        The <span className="text-green-600">Challenge</span> We Address
                                    </h2>
                                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                        Understanding the critical need for locally led adaptation in Africa's most vulnerable communities
                                    </p>
                                </div>

                                {/* Challenge Cards - Mobile Optimized */}
                                <div className="space-y-8 sm:space-y-12">
                                    {/* Reality Card */}
                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                        <div className="space-y-6">
                                            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-red-100">
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">The Reality</h3>
                                                <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                                                    <p>Despite growing interest in accelerating locally led adaptation (LLA), evidence on effective interventions, vulnerability-specific approaches, and investment opportunities remains scarce.</p>
                                                    <p>This gap is primarily due to the absence of dedicated bottom-up indicators or community-led frameworks and metrics.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative order-first lg:order-last">
                                            <img
                                                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                                alt="Climate change impacts in Africa"
                                                className="rounded-2xl shadow-xl w-full h-64 sm:h-80 object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Solution Card */}
                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                                alt="Community collaboration"
                                                className="rounded-2xl shadow-xl w-full h-64 sm:h-80 object-cover"
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-green-100">
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
                                                <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                                                    <p>LAMA addresses this challenge by establishing a comprehensive platform that fosters learning and consolidation of locally led adaptation indicators across Africa.</p>
                                                    <p>We bridge the gap between adaptation needs and investment through collaborative stakeholder engagement and data-driven insights.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Platform Relevance Section - Mobile Optimized */}
                    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 sm:mb-16">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                        Why <span className="text-green-600">LAMA</span> Matters
                                    </h2>
                                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                        Four key areas where LAMA dashboard creates transformative impact for climate adaptation
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                    {relevancePoints.map((point, index) => {
                                        const Icon = point.icon;
                                        return (
                                            <div key={index} className="group">
                                                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                                                    <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                                                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                <span className="hidden sm:inline">{point.stats}</span>
                                                                <span className="sm:hidden">Key Metric</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{point.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Platform Components Section - Mobile Optimized */}
                    <section className="py-12 sm:py-16 lg:py-20">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 sm:mb-16">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                        Platform <span className="text-green-600">Components</span>
                                    </h2>
                                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                                        Five interconnected components working together to create meaningful adaptation outcomes
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {components.map((component, index) => {
                                        const Icon = component.icon;
                                        return (
                                            <div key={index} className="group cursor-pointer">
                                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full hover:border-green-200">
                                                    <div className={`inline-flex p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 ${component.color}`}>
                                                        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                                    </div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-600 transition-colors duration-300">
                                                        {component.title}
                                                    </h3>
                                                    <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">{component.description}</p>
                                                    <div className="inline-flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* LAMA Advisory Group Carousel Section - Mobile Optimized */}
                    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-12 sm:mb-16">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                        LAMA <span className="text-green-600">Advisory Group</span>
                                    </h2>
                                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                                        Our expert advisory group comprises ten distinguished professionals from diverse backgrounds, bringing together expertise from the African Group of Negotiators, research institutions, private sector, government, and local communities.
                                    </p>
                                    <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-3 sm:px-4 py-2">
                                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                        <span className="text-green-700 text-xs sm:text-sm font-medium">Expert Network</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                                        <div className="relative h-auto">
                                            {advisors.map((advisor, index) => (
                                                <div
                                                    key={index}
                                                    className={`transition-all duration-500 ease-in-out ${index === currentAdvisor
                                                        ? 'opacity-100 transform translate-x-0 relative'
                                                        : 'opacity-0 transform translate-x-full absolute inset-0'
                                                        }`}
                                                >
                                                    <div className="flex flex-col md:grid md:grid-cols-2">
                                                        {/* Image Section */}
                                                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 sm:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                                                            <div className="relative">
                                                                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                                                    <img
                                                                        src={advisor.image}
                                                                        alt={advisor.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                                    <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Content Section */}
                                                        <div className="p-6 sm:p-8 flex flex-col justify-center min-h-[300px] md:min-h-[400px]">
                                                            <div className="mb-4 sm:mb-6">
                                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{advisor.name}</h3>
                                                                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2">
                                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                    <span className="hidden sm:inline">{advisor.role}</span>
                                                                    <span className="sm:hidden">Expert</span>
                                                                </div>
                                                                <p className="text-gray-600 font-medium text-sm sm:text-base">{advisor.background}</p>
                                                            </div>
                                                            <p className="text-gray-700 leading-relaxed italic text-sm sm:text-base">"{advisor.bio}"</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Navigation Controls - Mobile Optimized */}
                                        <div className="absolute top-1/2 transform -translate-y-1/2 left-2 sm:left-4 z-10">
                                            <button
                                                onClick={prevAdvisor}
                                                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl"
                                            >
                                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                                            </button>
                                        </div>
                                        <div className="absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4 z-10">
                                            <button
                                                onClick={nextAdvisor}
                                                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl"
                                            >
                                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                                            </button>
                                        </div>

                                        {/* Progress Indicators */}
                                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                                            {advisors.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentAdvisor(index)}
                                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentAdvisor
                                                        ? 'bg-white shadow-lg'
                                                        : 'bg-white/50 hover:bg-white/70'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Objectives Section - Mobile Optimized */}
                    <section className="py-12 sm:py-16 lg:py-20">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12 sm:mb-16">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                        Our <span className="text-green-600">Objectives</span>
                                    </h2>
                                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                        Three core objectives driving our mission to advance locally led adaptation across Africa
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                                    {objectives.map((objective, index) => {
                                        const Icon = objective.icon;
                                        return (
                                            <div key={index} className="group">
                                                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full hover:border-green-200">
                                                    <div className="text-center">
                                                        <div className="inline-flex p-3 sm:p-4 bg-green-100 rounded-2xl mb-4 sm:mb-6">
                                                            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                                                        </div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-600 transition-colors duration-300">
                                                            {objective.title}
                                                        </h3>
                                                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4">
                                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            <span>{objective.highlight}</span>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{objective.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <LamaFooter />

        </>
    );
};

export default AboutPage;
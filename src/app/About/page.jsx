'use client';
import React from 'react';
import { Users, Target, Globe, BarChart3, Heart, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';

const AboutPage = () => {
    const components = [
        {
            icon: BarChart3,
            title: "Interactive dashboard",
            description: "The LAMA dashboard will serve as a central hub for data visualization, analysis, and interaction. It will incorporate local, sub-national, national, and global indicators related to adaptation, climate, and weather. The platform will facilitate comparative analysis, enabling the co-creation of metrics that align local aspirations with broader adaptation policies and investments. Additionally, the dashboard will showcase impact stories from LLA projects across the continent.",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Target,
            title: "LLA Interventions Database",
            description: "This component will house information on LLA projects and initiatives implemented across Africa. The database will enable the comparison of lessons learned from different interventions.",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: Globe,
            title: "Tools and Framework Repository",
            description: "The platform will provide access to a variety of tools and frameworks employed by different initiatives to assess progress and track indicators.",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: Users,
            title: "Stakeholder Engagement Platform",
            description: "A comprehensive stakeholder database will be maintained, including individuals and organizations involved in adaptation at both project and policy levels. These stakeholders will form the LAMA Engagement Group, convening regularly to share insights on adaptation measurement. The expert group will synthesize these findings into knowledge products and advisories.",
            color: "bg-orange-50 text-orange-600"
        },
        {
            icon: Heart,
            title: "Metrics Advisory/Expert Group",
            description: "Composed of ten experts from diverse backgrounds (including the African Group of Negotiators, research, private sector, government, and local communities), this group will consolidate best practices and indicators. The expert group will also play a crucial role in linking local metrics to national and international frameworks, supporting the African Group of Negotiators' contributions to the Global Goal on Adaptation, and informing IPCC assessments.",
            color: "bg-red-50 text-red-600"
        }
    ];

    const objectives = [
        {
            title: "Capacity Building",
            description: "Provide expert support to African countries and researchers to enhance their capacity to develop adaptation indicators that effectively capture local priorities in an inclusive manner."
        },
        {
            title: "Knowledge Sharing",
            description: "Facilitate the sharing of experiences and best practices in adaptation measurement among various projects and initiatives operating at the local level."
        },
        {
            title: "Framework Development",
            description: "Consolidate knowledge and priorities regarding adaptation metrics in Africa, aligning them with national and global frameworks such as National Adaptation Plans (NAPs), Nationally Determined Contributions (NDCs), the GGA, and the GST."
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
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Image Section */}
                                <div className="order-2 lg:order-1">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl transform rotate-3"></div>
                                        <img
                                            src="https://images.unsplash.com/photo-1569438520635-a89e30b57ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="African communities adapting to climate change"
                                            className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="order-1 lg:order-2">
                                    <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-2 mb-8">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-green-700 text-sm font-medium">About LAMA</span>
                                    </div>

                                    <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                        About <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">LAMA</span>
                                    </h1>

                                    <div className="space-y-4 mb-8">
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            The LAMA Platform aims to convene diverse stakeholders engaged in LLA initiatives across Africa, facilitating the exchange of experiences, tools, and indicators.
                                        </p>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            The platform will consolidate locally led and inclusive frameworks and data to inform the Global Goal on Adaptation (GGA) and Global Stocktake (GST).
                                        </p>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            By convening stakeholders engaged in LLA initiatives, the platform will facilitate the sharing of experiences, tools, and indicators across Africa.
                                        </p>
                                    </div>

                                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 inline-flex items-center gap-2">
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Key Components Section */}
                {/* Key Components Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Components of the <span className="text-green-600">LAMA Platform</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                LAMA operates through five interconnected components that work together to create meaningful change
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {components.map((component, index) => {
                                const Icon = component.icon;
                                return (
                                    <div key={index} className="group cursor-pointer">
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full hover:border-green-200">
                                            <div className={`inline-flex p-4 rounded-xl mb-4 ${component.color}`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                                {component.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-4">{component.description}</p>
                                            <div className="inline-flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>   {/* ✅ this was missing */}
                    </div>
                </section>

                {/* Aims and Objectives Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Specific <span className="text-green-600">Objectives</span>
                                </h2>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Our comprehensive approach to locally led adaptation metrics focuses on three core objectives
                                </p>
                            </div>

                            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                                {objectives.map((objective, index) => (
                                    <div key={index} className="group">
                                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{objective.title}</h3>
                                                    <p className="text-gray-600 leading-relaxed">{objective.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
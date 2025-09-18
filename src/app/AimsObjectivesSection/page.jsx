'use client';
import React from 'react';
import { BookOpen, Users, BarChart3, Globe, Target, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const AimsObjectivesPage = () => {
    const mainObjectives = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Knowledge Consolidation",
            description: "Consolidate existing knowledge and experiences on locally led adaptation indicators across Africa",
            details: [
                "Compile best practices from diverse adaptation initiatives",
                "Document successful community-led indicators",
                "Create a comprehensive knowledge repository",
                "Identify gaps in current measurement approaches"
            ]
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Stakeholder Engagement",
            description: "Convene diverse stakeholders engaged in LLA initiatives to facilitate knowledge sharing",
            details: [
                "Build networks of practitioners and researchers",
                "Foster collaboration across sectors and regions",
                "Enable peer-to-peer learning opportunities",
                "Strengthen community leadership capacity"
            ]
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Framework Development",
            description: "Develop locally led and inclusive frameworks and metrics for adaptation assessment",
            details: [
                "Co-create indicators with local communities",
                "Ensure cultural and contextual relevance",
                "Design flexible yet standardized approaches",
                "Integrate gender and social inclusion principles"
            ]
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Integration",
            description: "Link local adaptation metrics to the Global Goal on Adaptation and Global Stocktake",
            details: [
                "Bridge local and global climate frameworks",
                "Contribute to international reporting mechanisms",
                "Influence policy at national and international levels",
                "Scale local innovations to broader contexts"
            ]
        }
    ];

    const strategicGoals = [
        {
            title: "Enhance Adaptation Effectiveness",
            description: "Improve the quality and impact of locally led adaptation interventions through better measurement and evaluation.",
            color: "from-green-500 to-emerald-600"
        },
        {
            title: "Promote Inclusivity",
            description: "Ensure that the voices and needs of marginalized communities, including women and youth, are central to adaptation planning.",
            color: "from-blue-500 to-cyan-600"
        },
        {
            title: "Strengthen Local Leadership",
            description: "Build the capacity of local organizations and communities to lead their own adaptation processes.",
            color: "from-purple-500 to-indigo-600"
        },
        {
            title: "Inform Policy and Investment",
            description: "Provide evidence-based insights to guide adaptation policy and direct climate finance where it's needed most.",
            color: "from-orange-500 to-red-600"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Aims & <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Objectives</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light">
                            Building bridges between local resilience and global climate action
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Aim */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl mb-16">
                            <div className="flex items-center gap-4 mb-4">
                                <Target className="w-8 h-8" />
                                <h2 className="text-2xl font-bold">Primary Aim</h2>
                            </div>
                            <p className="text-xl leading-relaxed">
                                To bridge the gap between local adaptation needs and global climate frameworks through the development of community-driven metrics and inclusive indicators that capture the effectiveness and inclusiveness of adaptation strategies at the community level.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Objectives */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Objectives</h2>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {mainObjectives.map((objective, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 p-4 bg-green-100 rounded-xl text-green-600">
                                            {objective.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{objective.title}</h3>
                                            <p className="text-gray-700 mb-4">{objective.description}</p>
                                            <ul className="space-y-2">
                                                {objective.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Goals */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Strategic Goals</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {strategicGoals.map((goal, index) => (
                                <div key={index} className={`bg-gradient-to-br ${goal.color} text-white p-8 rounded-2xl`}>
                                    <h3 className="text-xl font-bold mb-4">{goal.title}</h3>
                                    <p className="text-white/90 leading-relaxed">{goal.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Expected Outcomes */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Expected Outcomes</h2>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Evidence Base</h3>
                                <p className="text-gray-700">
                                    Robust evidence on effective locally led adaptation interventions, vulnerability-specific approaches, and investment opportunities across Africa.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Improved Resource Allocation</h3>
                                <p className="text-gray-700">
                                    Better alignment of climate finance and resources with actual community needs and priorities, reducing misallocation and improving impact.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strengthened Local Capacity</h3>
                                <p className="text-gray-700">
                                    Enhanced capacity of local organizations and communities to design, implement, and evaluate their own adaptation initiatives.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Influence</h3>
                                <p className="text-gray-700">
                                    Significant contribution to national adaptation plans, NDCs, and international climate frameworks through locally generated evidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Explore More</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Discover how LAMA achieves these objectives through its platform components and approach
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Link href="/components" className="group">
                                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                    Platform Components
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                            </Link>

                            <Link href="/rationale" className="group">
                                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                    Learn the Rationale
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AimsObjectivesPage;
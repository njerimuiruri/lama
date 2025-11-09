"use client"
import { useState } from "react"
import { Play, Eye, Clock, MapPin, Users, Star, Award, Zap, ChevronDown, X } from "lucide-react"

const ImpactsPage = () => {
    const [showMoreVideos, setShowMoreVideos] = useState(false)
    const [playingVideo, setPlayingVideo] = useState(null)

    const featuredImpact = {
        title: "Empowering Women-Led Climate Adaptation in Kenya",
        description:
            "Discover how local women's groups in rural Kenya are using community-driven adaptation indicators to secure climate finance and implement drought-resistant farming techniques that have increased crop yields by 40% while building community resilience.",
        location: "Turkana County, Kenya",
        duration: "8:45",
        views: "2.3K",
        category: "Community Leadership",
        thumbnail:
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        highlights: [
            "40% increase in crop yields",
            "150+ women trained in adaptation metrics",
            "Community-led early warning system established",
            "$50K in climate finance secured",
        ],
    }

    const impactCategories = [
        {
            icon: Users,
            title: "Community Empowerment",
            count: "12 videos",
            description: "Stories of local communities leading their own adaptation initiatives",
            color: "bg-blue-50 text-blue-600",
        },
        {
            icon: Award,
            title: "Innovation Showcase",
            count: "8 videos",
            description: "Innovative locally-led adaptation solutions across Africa",
            color: "bg-green-50 text-green-600",
        },
        {
            icon: Star,
            title: "Success Stories",
            count: "15 videos",
            description: "Measurable impacts and transformative community outcomes",
            color: "bg-purple-50 text-purple-600",
        },
        {
            icon: Zap,
            title: "Youth Leadership",
            count: "6 videos",
            description: "Young people driving climate adaptation in their communities",
            color: "bg-orange-50 text-orange-600",
        },
    ]

    const shortVideos = [
        {
            title: "Lama Community Climate Initiative",
            duration: "3:42",
            views: "1.2K",
            location: "Nyakach, Kisumu County",
            thumbnail:
                "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
            title: "Sagorota Women's Adaptation Group",
            duration: "4:21",
            views: "1.2K",
            location: "Sagorota, Kisumu County",
            thumbnail:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
            title: "Youth-Led Urban Adaptation in Nigeria",
            duration: "5:47",
            views: "2.7K",
            location: "Lagos, Nigeria",
            thumbnail:
                "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
    ]

    const additionalVideos = [
        {
            title: "Building Drought Resilience in the Horn of Africa",
            duration: "7:15",
            views: "3.2K",
            location: "Ethiopia",
            thumbnail:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
            title: "Community-Based Forest Conservation",
            duration: "6:48",
            views: "2.1K",
            location: "Uganda",
            thumbnail:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
            title: "Women Farmers: Climate Champions",
            duration: "5:52",
            views: "2.9K",
            location: "Tanzania",
            thumbnail:
                "https://images.unsplash.com/photo-1500382017468-7049fae99e65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
            title: "Renewable Energy in Rural Communities",
            duration: "8:10",
            views: "3.5K",
            location: "Mali",
            thumbnail:
                "https://images.unsplash.com/photo-1509391366360-2e938e83e9e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
    ]

    const displayedVideos = showMoreVideos ? [...shortVideos, ...additionalVideos] : shortVideos

    return (
        <div className="min-h-screen bg-white">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-32 right-20 w-64 h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-32 left-20 w-72 h-72 bg-gradient-to-tr from-blue-50 to-sky-50 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative z-10">
                <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-2 mb-8">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-700 text-sm font-medium">Impact Stories</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                Real{" "}
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Impact Stories
                                </span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
                                Witness the transformative power of locally led adaptation initiatives across Africa through compelling
                                stories of resilience and innovation
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="relative group">
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                        <img
                                            src={featuredImpact.thumbnail || "/placeholder.svg"}
                                            alt={featuredImpact.title}
                                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={() => setPlayingVideo(featuredImpact)}
                                                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
                                            >
                                                <Play className="w-8 h-8 text-green-600 ml-1" fill="currentColor" />
                                            </button>
                                        </div>

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

                                    <div className="absolute -top-4 left-4">
                                        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            {featuredImpact.category}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                                        <MapPin className="w-4 h-4" />
                                        {featuredImpact.location}
                                    </div>

                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{featuredImpact.title}</h2>

                                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{featuredImpact.description}</p>

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

                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">More Impact Stories</h2>
                                <p className="text-lg text-gray-600">
                                    Explore short video clips showcasing climate adaptation initiatives across Kenya and Africa
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {displayedVideos.map((video, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div
                                            className="relative overflow-hidden rounded-xl shadow-lg mb-4"
                                            onClick={() => setPlayingVideo(video)}
                                        >
                                            <img
                                                src={video.thumbnail || "/placeholder.svg"}
                                                alt={video.title}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                                                    <Play className="w-6 h-6 text-green-600 ml-0.5" fill="currentColor" />
                                                </button>
                                            </div>

                                            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {video.duration}
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                            <MapPin className="w-4 h-4 text-green-600" />
                                            {video.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Eye className="w-4 h-4" />
                                            {video.views} views
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!showMoreVideos && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setShowMoreVideos(true)}
                                        className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Show More Videos
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {showMoreVideos && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setShowMoreVideos(false)}
                                        className="inline-flex items-center gap-2 bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-300"
                                    >
                                        Show Less
                                        <ChevronDown className="w-5 h-5 rotate-180" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {playingVideo && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        onClick={() => setPlayingVideo(null)}
                    >
                        <div
                            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative bg-black flex items-center justify-center">
                                <button
                                    onClick={() => setPlayingVideo(null)}
                                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-black" />
                                </button>
                                <iframe
                                    width="100%"
                                    height="500"
                                    src={playingVideo.videoUrl}
                                    title={playingVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-t-lg"
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{playingVideo.title}</h2>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {playingVideo.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {playingVideo.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {playingVideo.views} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImpactsPage

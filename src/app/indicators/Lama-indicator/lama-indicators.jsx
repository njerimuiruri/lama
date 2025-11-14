import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Home, Search, Target, FileText, Layers, AlertCircle, CheckCircle2, Grid3x3, BarChart3, PieChart, TrendingUp, Calendar, Activity } from 'lucide-react';

export default function LAMAIndicatorViewer() {
    const [data, setData] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedIndicator, setSelectedIndicator] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showVisualization, setShowVisualization] = useState(false);

    // Load data from JSON file
    useEffect(() => {
        fetch('/documents/lla.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load data');
                return response.json();
            })
            .then(jsonData => {
                setData(jsonData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading data:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Get unique raw indicators for selected sector
    const rawIndicatorsForSector = useMemo(() => {
        if (!data || !selectedSector) return [];

        const indicators = data.indicators
            .filter(item => item.thematicSector === selectedSector)
            .reduce((acc, item) => {
                if (item.rawIndicator && !acc.some(i => i.rawIndicator === item.rawIndicator)) {
                    const entries = data.indicators.filter(
                        ind => ind.thematicSector === selectedSector &&
                            ind.rawIndicator === item.rawIndicator
                    );
                    const complete = entries.filter(e => e.ammendedIndicator).length;

                    acc.push({
                        rawIndicator: item.rawIndicator,
                        count: entries.length,
                        complete: complete,
                        completeness: Math.round((complete / entries.length) * 100),
                        hasAmended: entries.some(e => e.ammendedIndicator)
                    });
                }
                return acc;
            }, []);

        return indicators;
    }, [data, selectedSector]);

    // Get all details for selected raw indicator
    const indicatorDetails = useMemo(() => {
        if (!data || !selectedSector || !selectedIndicator) return [];

        return data.indicators.filter(
            item => item.thematicSector === selectedSector &&
                item.rawIndicator === selectedIndicator
        );
    }, [data, selectedSector, selectedIndicator]);

    // Filter raw indicators by search
    const filteredRawIndicators = useMemo(() => {
        if (!searchTerm) return rawIndicatorsForSector;
        return rawIndicatorsForSector.filter(item =>
            item.rawIndicator.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [rawIndicatorsForSector, searchTerm]);

    // Calculate statistics for visualization
    const statistics = useMemo(() => {
        if (!data) return null;

        const sectorCounts = {};
        const sectorCompleted = {};
        let totalComplete = 0;

        data.metadata.thematicSectors.forEach(sector => {
            const indicators = data.indicators.filter(i => i.thematicSector === sector);
            const complete = indicators.filter(i => i.ammendedIndicator).length;
            sectorCounts[sector] = indicators.length;
            sectorCompleted[sector] = complete;
            totalComplete += complete;
        });

        const uniqueRawIndicators = new Set(data.indicators.map(i => i.rawIndicator)).size;
        const completionRate = Math.round((totalComplete / data.metadata.totalIndicators) * 100);

        // Target relevance distribution
        const targetRelevance = {};
        data.indicators.forEach(item => {
            if (item.targetRelevance) {
                targetRelevance[item.targetRelevance] = (targetRelevance[item.targetRelevance] || 0) + 1;
            }
        });

        // Measurement unit distribution
        const measurementUnits = {};
        data.indicators.forEach(item => {
            if (item.possibleMeasurementUnit) {
                measurementUnits[item.possibleMeasurementUnit] = (measurementUnits[item.possibleMeasurementUnit] || 0) + 1;
            }
        });

        return {
            totalIndicators: data.metadata.totalIndicators,
            totalComplete,
            completionRate,
            uniqueRawIndicators,
            sectorCounts,
            sectorCompleted,
            targetRelevance,
            measurementUnits,
            totalSectors: data.metadata.thematicSectors.length
        };
    }, [data]);

    // Sector statistics
    const sectorStats = useMemo(() => {
        if (!data) return {};

        return data.metadata.thematicSectors.reduce((acc, sector) => {
            const indicators = data.indicators.filter(item => item.thematicSector === sector);
            const uniqueRaw = new Set(indicators.map(i => i.rawIndicator)).size;
            const withAmended = indicators.filter(i => i.ammendedIndicator).length;

            acc[sector] = {
                total: indicators.length,
                uniqueRaw,
                withAmended,
                completeness: Math.round((withAmended / indicators.length) * 100)
            };
            return acc;
        }, {});
    }, [data]);

    // Sector colors
    const sectorColors = {
        "Water": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", hover: "hover:bg-blue-100", gradient: "from-blue-400 to-blue-600", ring: "ring-blue-200" },
        "Agriculture & Food Security": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", hover: "hover:bg-green-100", gradient: "from-green-400 to-green-600", ring: "ring-green-200" },
        "Poverty & Livelihood": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", hover: "hover:bg-purple-100", gradient: "from-purple-400 to-purple-600", ring: "ring-purple-200" },
        "Cultural Heritage & Social Inclusion": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", hover: "hover:bg-pink-100", gradient: "from-pink-400 to-pink-600", ring: "ring-pink-200" },
        "Health": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", hover: "hover:bg-red-100", gradient: "from-red-400 to-red-600", ring: "ring-red-200" },
        "Infrastructure & Human Settlements": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", hover: "hover:bg-orange-100", gradient: "from-orange-400 to-orange-600", ring: "ring-orange-200" },
        "Ecosystem & Biodiversity": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", hover: "hover:bg-emerald-100", gradient: "from-emerald-400 to-emerald-600", ring: "ring-emerald-200" },
        "Governance and Policy": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", hover: "hover:bg-indigo-100", gradient: "from-indigo-400 to-indigo-600", ring: "ring-indigo-200" }
    };

    const handleBackToSectors = () => {
        setSelectedSector(null);
        setSelectedIndicator(null);
        setSearchTerm('');
        setShowVisualization(false);
    };

    const handleBackToRawIndicators = () => {
        setSelectedIndicator(null);
        setSearchTerm('');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#eefdf5' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-700 text-lg font-medium">Loading LAMA Indicators...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#eefdf5' }}>
                <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <p className="text-sm text-gray-500">Please ensure /lla.json file exists and is accessible.</p>
                </div>
            </div>
        );
    }

    // Visualization View
    if (showVisualization) {
        const maxSector = Math.max(...Object.values(statistics.sectorCounts));
        const maxTarget = statistics.targetRelevance ? Math.max(...Object.values(statistics.targetRelevance)) : 1;

        return (
            <div className="min-h-screen" style={{ backgroundColor: '#eefdf5' }}>
                {/* Header */}
                <div className="bg-white border-b-2 border-emerald-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <button
                                onClick={() => setShowVisualization(false)}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors font-semibold border-2 border-emerald-200"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>
                            <div className="text-left sm:text-right">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                                <p className="text-gray-600 text-sm">LAMA Indicator Matrix Overview</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-200">
                            <div className="flex items-center justify-between mb-2">
                                <BarChart3 className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">{statistics.totalIndicators}</h3>
                            <p className="text-sm text-gray-600 font-medium">Total Indicators</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                                <Target className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">{statistics.uniqueRawIndicators}</h3>
                            <p className="text-sm text-gray-600 font-medium">Unique Indicators</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                                <CheckCircle2 className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1">{statistics.totalComplete}</h3>
                            <p className="text-sm text-gray-600 font-medium">Completed</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                            <div className="flex items-center justify-between mb-2">
                                <Activity className="w-10 h-10 text-amber-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-amber-600 mb-1">{statistics.completionRate}%</h3>
                            <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
                        </div>
                    </div>

                    {/* Sector Distribution */}
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6 sm:mb-8 border-2 border-emerald-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                                <PieChart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Distribution by Thematic Sector</h2>
                                <p className="text-sm text-gray-600">Indicators across all sectors</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(statistics.sectorCounts)
                                .sort((a, b) => b[1] - a[1])
                                .map(([sector, count]) => {
                                    const percentage = (count / maxSector) * 100;
                                    const colors = sectorColors[sector];
                                    const completed = statistics.sectorCompleted[sector];
                                    const completionPct = Math.round((completed / count) * 100);

                                    return (
                                        <div key={sector}>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                                <span className="font-semibold text-gray-800 text-sm sm:text-base">{sector}</span>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="font-bold text-emerald-600">{count} total</span>
                                                    <span className={`font-bold ${colors.text}`}>{completionPct}% complete</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Target Relevance */}
                        {statistics.targetRelevance && Object.keys(statistics.targetRelevance).length > 0 && (
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-emerald-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Target Relevance</h2>
                                        <p className="text-sm text-gray-600">Focus areas</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(statistics.targetRelevance)
                                        .sort((a, b) => b[1] - a[1])
                                        .slice(0, 8)
                                        .map(([target, count], index) => {
                                            const percentage = (count / maxTarget) * 100;
                                            return (
                                                <div key={target}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-gray-700 line-clamp-1">{target}</span>
                                                        <span className="text-sm font-bold text-blue-600 flex-shrink-0 ml-2">{count}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-blue-500 to-blue-600"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}

                        {/* Top Measurement Units */}
                        {statistics.measurementUnits && Object.keys(statistics.measurementUnits).length > 0 && (
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-emerald-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Grid3x3 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Measurement Units</h2>
                                        <p className="text-sm text-gray-600">Most common units</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {Object.entries(statistics.measurementUnits)
                                        .sort((a, b) => b[1] - a[1])
                                        .slice(0, 8)
                                        .map(([unit, count], index) => (
                                            <div key={unit} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                                                <span className="text-sm font-medium text-gray-700 line-clamp-1 flex-1">{unit}</span>
                                                <span className="text-sm font-bold text-purple-600 flex-shrink-0 ml-2">{count} uses</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#eefdf5' }}>
            {/* Header */}
            <div className="bg-white border-b-2 border-emerald-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">LAMA Indicator Matrix</h1>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">Local Adaptation Monitoring and Assessment</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {!selectedSector && (
                                <button
                                    onClick={() => setShowVisualization(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-medium text-sm"
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    <span className="hidden sm:inline">Analytics</span>
                                </button>
                            )}
                            <div className="text-right">
                                <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{data.metadata.totalIndicators}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Indicators</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            {(selectedSector || selectedIndicator) && (
                <div className="bg-white border-b border-emerald-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                        <nav className="flex items-center space-x-2 text-xs sm:text-sm overflow-x-auto">
                            <button
                                onClick={handleBackToSectors}
                                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 hover:underline font-medium transition-colors whitespace-nowrap"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Thematic Sectors</span>
                                <span className="sm:hidden">Sectors</span>
                            </button>
                            {selectedSector && (
                                <>
                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <button
                                        onClick={handleBackToRawIndicators}
                                        className={`font-semibold whitespace-nowrap truncate max-w-xs ${selectedIndicator ? 'text-emerald-600 hover:text-emerald-800 hover:underline' : 'text-gray-700'}`}
                                    >
                                        {selectedSector}
                                    </button>
                                </>
                            )}
                            {selectedIndicator && (
                                <>
                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-700 truncate max-w-xs">{selectedIndicator}</span>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* View 1: Thematic Sectors */}
                {!selectedSector && (
                    <div>
                        <div className="mb-6 text-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Select a Thematic Sector</h2>
                            <p className="text-gray-600 text-sm sm:text-base">Explore indicators organized by adaptation themes</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {data.metadata.thematicSectors.map(sector => {
                                const colors = sectorColors[sector];
                                const stats = sectorStats[sector];

                                return (
                                    <button
                                        key={sector}
                                        onClick={() => setSelectedSector(sector)}
                                        className={`group relative bg-white border-2 ${colors.border} rounded-2xl p-5 sm:p-6 ${colors.hover} transition-all duration-300 text-left overflow-hidden hover:shadow-xl hover:scale-105`}
                                    >
                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-full -mr-12 -mt-12 opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                        <div className="relative">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                                                <Target className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 line-clamp-2 min-h-[3rem]">{sector}</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                                    <span className="text-gray-600">Total Indicators:</span>
                                                    <span className={`font-bold ${colors.text}`}>{stats.total}</span>
                                                </div>
                                                <div className={`flex items-center gap-2 text-xs font-semibold ${colors.text} pt-2 border-t ${colors.border}`}>
                                                    <span>Click to view more</span>
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* View 2: Raw Indicators */}
                {selectedSector && !selectedIndicator && (
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border-2 border-emerald-100">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${sectorColors[selectedSector].gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedSector}</h2>
                                        <p className={`text-xs sm:text-sm font-semibold ${sectorColors[selectedSector].text}`}>
                                            {rawIndicatorsForSector.length} unique raw indicators
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button
                                        onClick={() => setShowVisualization(true)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg font-semibold text-purple-700 text-sm transition-all flex-1 sm:flex-initial"
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Analytics</span>
                                    </button>
                                    <button
                                        onClick={handleBackToSectors}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg font-semibold text-emerald-700 text-sm transition-all flex-1 sm:flex-initial"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-emerald-600" />
                                <input
                                    type="text"
                                    placeholder="Search raw indicators..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-emerald-50 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Raw Indicators Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredRawIndicators.length > 0 ? (
                                filteredRawIndicators.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedIndicator(item.rawIndicator)}
                                        className={`bg-white border-2 ${sectorColors[selectedSector].border} rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all text-left group relative overflow-hidden`}
                                    >
                                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${sectorColors[selectedSector].gradient} rounded-full -mr-10 -mt-10 opacity-5 group-hover:opacity-10 transition-opacity`}></div>

                                        <div className="relative">
                                            {/* Status Badge */}
                                            <div className="flex items-center justify-between mb-3">
                                                {item.hasAmended ? (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Complete
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Pending
                                                    </span>
                                                )}
                                                <ChevronRight className={`w-5 h-5 ${sectorColors[selectedSector].text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                            </div>

                                            {/* Indicator Text */}
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 line-clamp-3 min-h-[3.5rem] group-hover:text-emerald-600 transition-colors">
                                                {item.rawIndicator}
                                            </h3>

                                            {/* Stats */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600">Total entries:</span>
                                                    <span className={`font-bold ${sectorColors[selectedSector].text}`}>{item.count}</span>
                                                </div>
                                                {/* <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600">Completed:</span>
                                                    <span className="font-bold text-green-600">{item.complete}</span>
                                                </div> */}

                                                {/* Progress Bar */}
                                                {/* <div className="mt-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs text-gray-500">Completeness</span>
                                                        <span className="text-xs font-bold text-emerald-600">{item.completeness}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${sectorColors[selectedSector].gradient}`}
                                                            style={{ width: `${item.completeness}%` }}
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="col-span-full bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-emerald-100">
                                    <Search className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                                    <p className="text-gray-600 mb-4 text-sm sm:text-base">No indicators match your search</p>
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm sm:text-base"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* View 3: Indicator Details */}
                {selectedSector && selectedIndicator && (
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border-2 border-emerald-100">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${sectorColors[selectedSector].bg} ${sectorColors[selectedSector].text}`}>
                                            {selectedSector}
                                        </span>
                                    </div>
                                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{selectedIndicator}</h2>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {indicatorDetails.length} {indicatorDetails.length === 1 ? 'detail' : 'details'} found
                                    </p>
                                </div>
                                <button
                                    onClick={handleBackToRawIndicators}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg font-semibold text-emerald-700 text-sm transition-all w-full sm:w-auto justify-center"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back to Indicators
                                </button>
                            </div>
                        </div>

                        {/* Details Cards */}
                        <div className="space-y-4">
                            {indicatorDetails.map((detail, index) => (
                                <div key={detail.id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-emerald-100">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="text-xs font-bold text-emerald-600">ID: {detail.id}</span>
                                                {detail.ammendedIndicator && (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                )}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900">Detail #{index + 1}</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Amended Indicator */}
                                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                <h4 className="font-bold text-gray-900 text-sm">Amended Indicator</h4>
                                            </div>
                                            {detail.ammendedIndicator ? (
                                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{detail.ammendedIndicator}</p>
                                            ) : (
                                                <p className="text-gray-400 italic text-sm">Not specified</p>
                                            )}
                                        </div>

                                        {/* Two Column Grid for Unit and Relevance */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Measurement Unit */}
                                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Grid3x3 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                    <h4 className="font-bold text-gray-900 text-sm">Measurement Unit</h4>
                                                </div>
                                                {detail.possibleMeasurementUnit ? (
                                                    <p className="text-gray-700 font-medium text-sm sm:text-base">{detail.possibleMeasurementUnit}</p>
                                                ) : (
                                                    <p className="text-gray-400 italic text-sm">Not specified</p>
                                                )}
                                            </div>

                                            {/* Target Relevance */}
                                            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Target className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                                    <h4 className="font-bold text-gray-900 text-sm">Target Relevance</h4>
                                                </div>
                                                {detail.targetRelevance ? (
                                                    <p className="text-gray-700 font-medium text-sm sm:text-base">{detail.targetRelevance}</p>
                                                ) : (
                                                    <p className="text-gray-400 italic text-sm">Not specified</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
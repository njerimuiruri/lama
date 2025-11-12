"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, MapPin, Filter, Leaf, ChevronRight, Home, ChevronLeft, BarChart3, PieChart, TrendingUp, Activity, Target, Building2 } from 'lucide-react';

export default function CountyDataViewer() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStrategicSector, setSelectedStrategicSector] = useState('All');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showVisualization, setShowVisualization] = useState(false);
    const [showAllSectors, setShowAllSectors] = useState(false);

    useEffect(() => {
        fetch('/documents/CountyClimateChangeAdaptationCleaned.json')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading data:', error);
                setLoading(false);
            });
    }, []);

    const counties = [...new Set(data.map(item => item.Organisations))].sort();

    const countyStrategicSectors = selectedCounty
        ? ['All', ...new Set(data.filter(item => item.Organisations === selectedCounty && item.StrategicSector).map(item => item.StrategicSector))]
        : ['All'];

    useEffect(() => {
        let filtered = data;

        if (selectedCounty) {
            filtered = filtered.filter(item => item.Organisations === selectedCounty);
        }

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.Activity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Indicators?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.StrategicSector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Sector?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedStrategicSector !== 'All') {
            filtered = filtered.filter(item => item.StrategicSector === selectedStrategicSector);
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    }, [selectedCounty, searchTerm, selectedStrategicSector, data]);

    // Calculate statistics for visualization
    const statistics = useMemo(() => {
        const totalInitiatives = data.length;

        // County breakdown
        const countyCounts = {};
        data.forEach(item => {
            if (item.Organisations) {
                countyCounts[item.Organisations] = (countyCounts[item.Organisations] || 0) + 1;
            }
        });

        // Strategic sector breakdown
        const sectorCounts = {};
        data.forEach(item => {
            if (item.StrategicSector) {
                sectorCounts[item.StrategicSector] = (sectorCounts[item.StrategicSector] || 0) + 1;
            }
        });

        // Source breakdown
        const sourceCounts = {};
        data.forEach(item => {
            if (item.Source) {
                sourceCounts[item.Source] = (sourceCounts[item.Source] || 0) + 1;
            }
        });

        return {
            totalInitiatives,
            countyCounts,
            sectorCounts,
            sourceCounts,
            totalCounties: Object.keys(countyCounts).length,
            totalSectors: Object.keys(sectorCounts).length
        };
    }, [data]);

    const handleBackToCounties = () => {
        setSelectedCounty(null);
        setSearchTerm('');
        setSelectedStrategicSector('All');
        setCurrentPage(1);
        setShowVisualization(false);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading county data...</p>
                </div>
            </div>
        );
    }

    // Visualization View
    if (showVisualization) {
        const maxCounty = Math.max(...Object.values(statistics.countyCounts));
        const maxSector = Math.max(...Object.values(statistics.sectorCounts));
        const maxSource = Math.max(...Object.values(statistics.sourceCounts));

        const sectorColors = ['#0d9c5a', '#10b66d', '#13d080', '#34b679', '#5bc99a', '#7ee3b3', '#a8edc9', '#c5f4dc'];
        const sourceColors = ['#f59e0b', '#fbbf24', '#fcd34d'];

        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => setShowVisualization(false)}
                            className="flex items-center gap-2 px-5 py-3 bg-white text-green-600 hover:bg-green-50 rounded-xl transition-colors font-semibold shadow-md"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                            {selectedCounty ? `Back to ${selectedCounty}` : 'Back to Counties'}
                        </button>
                        <div className="text-right">
                            <h1 className="text-3xl font-bold text-gray-900">Data Visualization</h1>
                            <p className="text-gray-600">Climate adaptation insights</p>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <BarChart3 className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-green-600 mb-1">{statistics.totalInitiatives}</h3>
                            <p className="text-sm text-gray-600 font-medium">Total Initiatives</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                                <MapPin className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-1">{statistics.totalCounties}</h3>
                            <p className="text-sm text-gray-600 font-medium">Counties</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
                            <div className="flex items-center justify-between mb-2">
                                <Target className="w-10 h-10 text-amber-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-amber-600 mb-1">{statistics.totalSectors}</h3>
                            <p className="text-sm text-gray-600 font-medium">Strategic Sectors</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-200">
                            <div className="flex items-center justify-between mb-2">
                                <Activity className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-emerald-600 mb-1">{Object.keys(statistics.sourceCounts).length}</h3>
                            <p className="text-sm text-gray-600 font-medium">Data Sources</p>
                        </div>
                    </div>

                    {/* County Distribution */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Initiatives by County</h2>
                                <p className="text-sm text-gray-600">Distribution across all counties</p>
                            </div>
                        </div>

                        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                This chart shows the number of climate adaptation initiatives per county, helping identify
                                which regions have the most comprehensive climate action plans and where additional support may be needed.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(statistics.countyCounts)
                                .sort((a, b) => b[1] - a[1])
                                .map(([county, count], index) => {
                                    const percentage = (count / maxCounty) * 100;
                                    return (
                                        <div key={county}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-gray-800">{county}</span>
                                                <span className="text-sm font-bold text-green-600">{count} initiatives</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-green-500 to-green-600"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Strategic Sectors */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Strategic Sectors</h2>
                                    <p className="text-sm text-gray-600">Focus area distribution</p>
                                </div>
                            </div>

                            <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Strategic sectors represent key areas of climate adaptation focus including health, agriculture,
                                    water resources, and infrastructure. This shows where counties are prioritizing their efforts.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {Object.entries(statistics.sectorCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, showAllSectors ? undefined : 5)
                                    .map(([sector, count], index) => {
                                        const percentage = (count / maxSector) * 100;
                                        return (
                                            <div key={sector}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700">{sector}</span>
                                                    <span className="text-sm font-bold text-amber-600">{count}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            backgroundColor: sectorColors[index % sectorColors.length]
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {Object.entries(statistics.sectorCounts).length > 5 && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => setShowAllSectors(!showAllSectors)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                    >
                                        {showAllSectors ? (
                                            <>
                                                <span>Show Less</span>
                                                <ChevronRight className="w-4 h-4 rotate-90" />
                                            </>
                                        ) : (
                                            <>
                                                <span>View All {Object.entries(statistics.sectorCounts).length} Sectors</span>
                                                <ChevronRight className="w-4 h-4 -rotate-90" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Data Sources */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Data Sources</h2>
                                    <p className="text-sm text-gray-600">Information origins</p>
                                </div>
                            </div>

                            <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Data sources identify where the climate adaptation information originates from, such as
                                    County Climate Change Action Plans (CCCAP) and other planning documents.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {Object.entries(statistics.sourceCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([source, count], index) => {
                                        const percentage = (count / maxSource) * 100;
                                        return (
                                            <div key={source}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-700">{source}</span>
                                                    <span className="text-sm font-bold text-emerald-600">{count}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            backgroundColor: sourceColors[index % sourceColors.length]
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            {/* Page Title Header */}
            <div className="bg-white border-b-2 border-green-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">County Climate Change Adaptation</h1>
                                <p className="text-gray-600 text-sm mt-1">Explore climate initiatives across Kenyan counties</p>
                            </div>
                        </div>

                        {!selectedCounty && (
                            <button
                                onClick={() => setShowVisualization(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                            >
                                <PieChart className="w-4 h-4" />
                                View Analytics
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            {selectedCounty && (
                <div className="bg-white border-b border-green-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
                        <nav className="flex items-center space-x-2 text-sm">
                            <button
                                onClick={handleBackToCounties}
                                className="flex items-center gap-1 text-green-600 hover:text-green-800 hover:underline font-medium transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                All Counties
                            </button>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 font-semibold">{selectedCounty}</span>
                            {selectedStrategicSector !== 'All' && (
                                <>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{selectedStrategicSector}</span>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* County Selection */}
                {!selectedCounty ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                        <div className="mb-6 text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
                                <MapPin className="w-7 h-7 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your County</h2>
                            <p className="text-gray-600">Choose a county to explore climate initiatives</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {counties.map(county => {
                                const count = data.filter(item => item.Organisations === county).length;
                                return (
                                    <button
                                        key={county}
                                        onClick={() => setSelectedCounty(county)}
                                        className="group relative bg-gradient-to-br from-green-50 to-white border-2 border-green-100 rounded-xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 text-left overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative">
                                            <div className="w-9 h-9 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                                                <MapPin className="w-5 h-5 text-green-700" />
                                            </div>
                                            <h3 className="text-sm font-bold text-gray-900 mb-1">{county}</h3>
                                            <p className="text-xs text-green-600 font-semibold">{count} initiatives</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* County Header */}
                        <div className="bg-white rounded-2xl shadow-lg p-5 border border-green-100">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedCounty}</h2>
                                        <p className="text-green-600 font-semibold text-sm">{filteredData.length} initiatives</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowVisualization(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg font-semibold text-blue-700 text-sm transition-all"
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                        Analytics
                                    </button>
                                    <button
                                        onClick={handleBackToCounties}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg font-semibold text-green-700 text-sm transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Change County
                                    </button>
                                </div>
                            </div>

                            {/* Filters Row */}
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-4 h-4 text-green-600" />
                                    <input
                                        type="text"
                                        placeholder="Search by activity, indicator, sector..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-green-50 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-400 focus:bg-white transition-all"
                                    />
                                </div>

                                <div className="relative">
                                    <Filter className="absolute left-3 top-3 w-4 h-4 text-green-600" />
                                    <select
                                        value={selectedStrategicSector}
                                        onChange={(e) => setSelectedStrategicSector(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-green-50 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-400 focus:bg-white cursor-pointer transition-all appearance-none"
                                    >
                                        {countyStrategicSectors.map(sector => (
                                            <option key={sector} value={sector}>
                                                {sector === 'All' ? 'All Strategic Sectors' : sector}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Info & Items Per Page */}
                        {filteredData.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
                                <p className="text-sm text-gray-600">
                                    Showing <span className="font-semibold text-gray-900">{indexOfFirstItem + 1}</span> to{' '}
                                    <span className="font-semibold text-gray-900">{Math.min(indexOfLastItem, filteredData.length)}</span> of{' '}
                                    <span className="font-semibold text-gray-900">{filteredData.length}</span> results
                                </p>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-600">Show:</label>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className="px-3 py-1.5 text-sm bg-white border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-400 cursor-pointer"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-sm text-gray-600">per page</span>
                                </div>
                            </div>
                        )}

                        {/* Data Table */}
                        {filteredData.length > 0 ? (
                            <>
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-green-100 to-green-50">
                                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                                        Strategic Sector
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                                        Sector
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                                        Indicators
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b border-green-50 hover:bg-green-50 transition-colors"
                                                    >
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                                                <span className="font-semibold text-gray-900 text-sm">
                                                                    {item.StrategicSector || 'N/A'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {item.Sector ? (
                                                                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-semibold">
                                                                    {item.Sector}
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400">—</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <p className="text-gray-700 text-sm leading-snug">
                                                                {item.Indicators?.trim() || 'No indicators specified'}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="bg-white rounded-2xl shadow-lg p-4 border border-green-100">
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <button
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                    }`}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                Previous
                                            </button>

                                            <div className="flex items-center gap-1">
                                                {getPageNumbers().map((pageNum, index) => (
                                                    pageNum === '...' ? (
                                                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                                                            ...
                                                        </span>
                                                    ) : (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => paginate(pageNum)}
                                                            className={`min-w-[40px] h-10 rounded-lg font-semibold text-sm transition-all ${currentPage === pageNum
                                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                                                                : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                                }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    )
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === totalPages
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                    }`}
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-green-100">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <Search className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                                <p className="text-gray-600 mb-4 text-sm">Try adjusting your search or filters</p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedStrategicSector('All');
                                    }}
                                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
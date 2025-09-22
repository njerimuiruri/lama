'use client';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, ComposedChart } from 'recharts';
import { Filter, TrendingUp, Users, PieChart } from 'lucide-react';
import LamaNavbar from '@/components/Navbar/navbar';

const LandDashboard = () => {
    const genderLandOwnership = [
        { category: 'Female', type: 'No', count: 25, percent: 8.9 },
        { category: 'Female', type: 'Yes', count: 256, percent: 91.1 },
        { category: 'Male', type: 'No', count: 23, percent: 8.4 },
        { category: 'Male', type: 'Yes', count: 250, percent: 91.6 }
    ];

    const ageBracketLandOwnership = [
        { category: 'adults', type: 'No', count: 11, percent: 7.6 },
        { category: 'adults', type: 'Yes', count: 134, percent: 92.4 },
        { category: 'elderly', type: 'No', count: 8, percent: 3.1 },
        { category: 'elderly', type: 'Yes', count: 249, percent: 96.9 },
        { category: 'youth', type: 'No', count: 29, percent: 19.1 },
        { category: 'youth', type: 'Yes', count: 123, percent: 80.9 }
    ];

    const genderLandSize = [
        { category: 'Female', type: '1 to 5acres', count: 125, percent: 44.5 },
        { category: 'Female', type: '11 to 15acres', count: 5, percent: 1.8 },
        { category: 'Female', type: '6 to 10acres', count: 13, percent: 4.6 },
        { category: 'Female', type: 'Below 1acre', count: 113, percent: 40.2 },
        { category: 'Female', type: 'nan', count: 25, percent: 8.9 },
        { category: 'Male', type: '1 to 5acres', count: 133, percent: 48.7 },
        { category: 'Male', type: '11 to 15acres', count: 2, percent: 0.7 },
        { category: 'Male', type: '6 to 10acres', count: 22, percent: 8.1 },
        { category: 'Male', type: 'Below 1acre', count: 93, percent: 34.1 },
        { category: 'Male', type: 'nan', count: 23, percent: 8.4 }
    ];

    const ageBracketLandSize = [
        { category: 'adults', type: '1 to 5acres', count: 74, percent: 51.0 },
        { category: 'adults', type: '11 to 15acres', count: 3, percent: 2.1 },
        { category: 'adults', type: '6 to 10acres', count: 6, percent: 4.1 },
        { category: 'adults', type: 'Below 1acre', count: 51, percent: 35.2 },
        { category: 'adults', type: 'nan', count: 11, percent: 7.6 },
        { category: 'elderly', type: '1 to 5acres', count: 126, percent: 49.0 },
        { category: 'elderly', type: '11 to 15acres', count: 3, percent: 1.2 },
        { category: 'elderly', type: '6 to 10acres', count: 24, percent: 9.3 },
        { category: 'elderly', type: 'Below 1acre', count: 96, percent: 37.4 },
        { category: 'elderly', type: 'nan', count: 8, percent: 3.1 },
        { category: 'youth', type: '1 to 5acres', count: 58, percent: 38.2 },
        { category: 'youth', type: '11 to 15acres', count: 1, percent: 0.7 },
        { category: 'youth', type: '6 to 10acres', count: 5, percent: 3.3 },
        { category: 'youth', type: 'Below 1acre', count: 59, percent: 38.8 },
        { category: 'youth', type: 'nan', count: 29, percent: 19.1 }
    ];

    // Filter states
    const [activeView, setActiveView] = useState('ownership-gender');
    const [chartType, setChartType] = useState('grouped');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [showDataTable, setShowDataTable] = useState(false);

    const getColor = (category, type) => {
        const colorMap = {
            'Female': '#ec4899', 'Male': '#3b82f6',
            'adults': '#10b981', 'elderly': '#f59e0b', 'youth': '#8b5cf6',
            'Yes': '#059669', 'No': '#dc2626',
            '1 to 5acres': '#16a34a', '6 to 10acres': '#ca8a04',
            '11 to 15acres': '#dc2626', 'Below 1acre': '#7c3aed', 'nan': '#6b7280'
        };
        return colorMap[category] || colorMap[type] || '#6b7280';
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
                    <p className="font-semibold text-gray-800 mb-2">{data.category} - {data.type}</p>
                    <div className="space-y-1">
                        <p className="text-green-600 font-medium">Count: {data.count}</p>
                        <p className="text-blue-600 font-medium">Percentage: {data.percent}%</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const getGroupedData = (dataset) => {
        const categories = [...new Set(dataset.map(item => item.category))];
        return categories.map(cat => {
            const items = dataset.filter(item => item.category === cat);
            const result = { category: cat };
            items.forEach(item => {
                result[item.type] = item.count;
                result[`${item.type}_percent`] = item.percent;
            });
            return result;
        });
    };

    const getStackedData = (dataset) => {
        const types = [...new Set(dataset.map(item => item.type))];
        return types.map(type => {
            const items = dataset.filter(item => item.type === type);
            const result = { type };
            items.forEach(item => {
                result[item.category] = item.count;
            });
            return result;
        });
    };

    const getCurrentDataset = () => {
        let dataset;
        switch (activeView) {
            case 'ownership-gender': dataset = genderLandOwnership; break;
            case 'ownership-age': dataset = ageBracketLandOwnership; break;
            case 'landsize-gender': dataset = genderLandSize; break;
            case 'landsize-age': dataset = ageBracketLandSize; break;
            default: dataset = genderLandOwnership;
        }

        return dataset.filter(item => {
            const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
            const typeMatch = selectedType === 'all' || item.type === selectedType;
            return categoryMatch && typeMatch;
        });
    };

    const currentData = getCurrentDataset();
    const groupedData = getGroupedData(currentData);
    const stackedData = getStackedData(currentData);

    const getOriginalDataset = () => {
        switch (activeView) {
            case 'ownership-gender': return genderLandOwnership;
            case 'ownership-age': return ageBracketLandOwnership;
            case 'landsize-gender': return genderLandSize;
            case 'landsize-age': return ageBracketLandSize;
            default: return genderLandOwnership;
        }
    };

    const originalData = getOriginalDataset();
    const categories = [...new Set(originalData.map(item => item.category))];
    const types = [...new Set(originalData.map(item => item.type))];

    return (
        <>
            <LamaNavbar />
            <div className="min-h-screen bg-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-32 right-20 w-64 h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl opacity-40"></div>
                    <div className="absolute bottom-32 left-20 w-72 h-72 bg-gradient-to-tr from-blue-50 to-sky-50 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="relative z-10">
                    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
                        <div className="container mx-auto px-6">
                            <div className="max-w-6xl mx-auto text-center">
                                <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-2 mb-6">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-700 text-sm font-medium">Land Systems Dashboard</span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
                                    Land <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Analytics</span> Dashboard
                                </h1>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Advanced visualization of land ownership and size distribution patterns with comprehensive filtering
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="py-8 bg-gray-50">
                        <div className="container mx-auto px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                    <div className="grid md:grid-cols-4 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Data View</label>
                                            <select
                                                value={activeView}
                                                onChange={(e) => {
                                                    setActiveView(e.target.value);
                                                    setSelectedCategory('all');
                                                    setSelectedType('all');
                                                }}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            >
                                                <option value="ownership-gender">Land Ownership by Gender</option>
                                                <option value="ownership-age">Land Ownership by Age_bracket</option>
                                                <option value="landsize-gender">Land Size by Gender</option>
                                                <option value="landsize-age">Land Size by Age_bracket</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
                                            <select
                                                value={chartType}
                                                onChange={(e) => setChartType(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            >
                                                <option value="grouped">Grouped Comparison</option>
                                                <option value="stacked">Stacked Distribution</option>
                                                <option value="relationship">Relationship View</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Filter Category</label>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="all">All Categories</option>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
                                            <select
                                                value={selectedType}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="all">All Types</option>
                                                {types.map(type => (
                                                    <option key={type} value={type}>{type === 'nan' ? 'No Land' : type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {(selectedCategory !== 'all' || selectedType !== 'all') && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Filter className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-medium text-blue-800">Active Filters:</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCategory !== 'all' && (
                                                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                                                        {selectedCategory}
                                                    </span>
                                                )}
                                                {selectedType !== 'all' && (
                                                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                                                        {selectedType === 'nan' ? 'No Land' : selectedType}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory('all');
                                                        setSelectedType('all');
                                                    }}
                                                    className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-full transition-colors"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <p className="text-sm text-blue-700 mt-2">
                                                Showing {currentData.length} records
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <button
                                            onClick={() => setShowDataTable(!showDataTable)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            <PieChart className="w-4 h-4" />
                                            {showDataTable ? 'Hide' : 'Show'} Data Table
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-12">
                        <div className="container mx-auto px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                    <div className="flex items-center gap-3 mb-8">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {activeView.replace('-', ' by ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </h2>
                                        {(selectedCategory !== 'all' || selectedType !== 'all') && (
                                            <span className="text-sm text-blue-600 font-medium">
                                                (Filtered View)
                                            </span>
                                        )}
                                    </div>

                                    {currentData.length === 0 && (
                                        <div className="text-center py-12">
                                            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No data matches your filters</h3>
                                            <p className="text-gray-600">Try adjusting your filter criteria to see results.</p>
                                        </div>
                                    )}

                                    {currentData.length > 0 && (
                                        <>
                                            {chartType === 'grouped' && (
                                                <ResponsiveContainer width="100%" height={500}>
                                                    <BarChart data={groupedData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                        <XAxis
                                                            dataKey="category"
                                                            tick={{ fontSize: 12 }}
                                                            height={60}
                                                        />
                                                        <YAxis domain={[0, 260]} />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        {types.filter(type => currentData.some(item => item.type === type)).map((type, index) => (
                                                            <Bar
                                                                key={type}
                                                                dataKey={type}
                                                                fill={getColor(null, type)}
                                                                radius={[2, 2, 0, 0]}
                                                                name={type}
                                                            />
                                                        ))}
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            )}

                                            {chartType === 'stacked' && (
                                                <ResponsiveContainer width="100%" height={500}>
                                                    <BarChart data={stackedData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                        <XAxis
                                                            dataKey="type"
                                                            tick={{ fontSize: 11 }}
                                                            angle={-45}
                                                            textAnchor="end"
                                                            height={100}
                                                        />
                                                        <YAxis domain={[0, 260]} />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        {categories.filter(cat => currentData.some(item => item.category === cat)).map((category, index) => (
                                                            <Bar
                                                                key={category}
                                                                dataKey={category}
                                                                stackId="a"
                                                                fill={getColor(category, null)}
                                                                name={category}
                                                            />
                                                        ))}
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            )}

                                            {/* Relationship Chart */}
                                            {chartType === 'relationship' && (
                                                <ResponsiveContainer width="100%" height={500}>
                                                    <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                        <XAxis
                                                            dataKey="category"
                                                            tick={{ fontSize: 11 }}
                                                            height={60}
                                                        />
                                                        <YAxis yAxisId="left" domain={[0, 260]} />
                                                        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Bar
                                                            yAxisId="left"
                                                            dataKey="count"
                                                            fill="#16a34a"
                                                            fillOpacity={0.6}
                                                            radius={[2, 2, 0, 0]}
                                                        />
                                                        <Line
                                                            yAxisId="right"
                                                            type="monotone"
                                                            dataKey="percent"
                                                            stroke="#dc2626"
                                                            strokeWidth={3}
                                                            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                                                        />
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                            )}

                                            {/* Legend */}
                                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                                                {(chartType === 'grouped' ?
                                                    types.filter(type => currentData.some(item => item.type === type)) :
                                                    categories.filter(cat => currentData.some(item => item.category === cat))
                                                ).map((item, index) => (
                                                    <div key={item} className="flex items-center gap-2">
                                                        <div
                                                            className="w-4 h-4 rounded"
                                                            style={{ backgroundColor: chartType === 'grouped' ? getColor(null, item) : getColor(item, null) }}
                                                        ></div>
                                                        <span className="text-sm text-gray-600 font-medium">{item === 'nan' ? 'No Land' : item}</span>
                                                    </div>
                                                ))}
                                                {chartType === 'relationship' && (
                                                    <>
                                                        <div className="flex items-center gap-2 ml-4">
                                                            <div className="w-4 h-4 bg-green-600 rounded"></div>
                                                            <span className="text-sm text-gray-600 font-medium">Count</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-1 bg-red-600 rounded"></div>
                                                            <span className="text-sm text-gray-600 font-medium">Percentage</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {currentData.length > 0 && (
                                    <div className="grid md:grid-cols-4 gap-6 mt-8">
                                        {currentData.slice(0, 4).map((item, index) => (
                                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-gray-800 text-sm">{item.category}</h3>
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(item.category, item.type) }}></div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                                                    <p className="text-sm text-gray-600">{item.type === 'nan' ? 'No Land' : item.type}</p>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="h-2 rounded-full"
                                                            style={{
                                                                width: `${item.percent}%`,
                                                                backgroundColor: getColor(item.category, item.type)
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{item.percent}%</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showDataTable && currentData.length > 0 && (
                                    <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                        <div className="p-6 border-b border-gray-200">
                                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                <PieChart className="w-5 h-5 text-green-600" />
                                                Detailed Data Table
                                            </h3>
                                            <p className="text-gray-600 mt-1">Complete breakdown of {currentData.length} records</p>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Category
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Type
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Count
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Percentage
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Visual
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {currentData.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <div
                                                                        className="w-3 h-3 rounded-full"
                                                                        style={{ backgroundColor: getColor(item.category, null) }}
                                                                    ></div>
                                                                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-sm text-gray-900">
                                                                    {item.type === 'nan' ? 'No Land' : item.type}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-sm font-semibold text-green-600">{item.count}</span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-sm font-semibold text-blue-600">{item.percent}%</span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                                                    <div
                                                                        className="h-2 rounded-full transition-all duration-300"
                                                                        style={{
                                                                            width: `${Math.min(item.percent, 100)}%`,
                                                                            backgroundColor: getColor(item.category, item.type)
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                                            <div className="grid md:grid-cols-3 gap-6">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {currentData.reduce((sum, item) => sum + item.count, 0)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">Total Records</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {Math.round(currentData.reduce((sum, item) => sum + item.percent, 0) / currentData.length)}%
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">Average Percentage</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        {Math.max(...currentData.map(item => item.count))}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">Highest Count</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>


                </div>
            </div>

        </>
    );
};

export default LandDashboard;
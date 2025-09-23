'use client';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, ComposedChart, Cell, LabelList } from 'recharts';
import { Filter, TrendingUp, Users, PieChart } from 'lucide-react';

const LandOwnership = () => {
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

    // Enhanced CustomTooltip with better data display
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl min-w-[200px]">
                    <p className="font-semibold text-gray-800 mb-3 text-center border-b border-gray-100 pb-2">
                        {label}
                    </p>
                    <div className="space-y-2">
                        {payload.map((entry, index) => {
                            // Find the original data point to get both count and percent
                            const originalData = currentData.find(item =>
                                (chartType === 'grouped' && item.category === label && item.type === entry.dataKey) ||
                                (chartType === 'stacked' && item.type === label && item.category === entry.dataKey) ||
                                (chartType === 'relationship' && item.category === label)
                            );

                            return (
                                <div key={index} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        ></div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {entry.dataKey === 'nan' ? 'No Land' : entry.dataKey}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-900">
                                            {entry.name === 'percent' ? `${entry.value}%` : entry.value}
                                        </div>
                                        {originalData && entry.name !== 'percent' && (
                                            <div className="text-xs text-gray-600">
                                                ({originalData.percent}%)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom label component for showing percentages on bars
    const CustomBarLabel = ({ x, y, width, height, value, payload }) => {
        // Only show labels for bars with sufficient height (count > 20)
        if (value < 20) return null;

        const originalData = currentData.find(item =>
            item.category === payload.category &&
            (item.type === payload.type || Object.keys(payload).some(key => key === item.type && payload[key] === value))
        );

        const percent = originalData ? originalData.percent : null;
        if (!percent) return null;

        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="bold"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
            >
                {percent}%
            </text>
        );
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

    // Calculate max value for Y-axis based on current data
    const getMaxValue = () => {
        const maxCount = Math.max(...currentData.map(item => item.count));
        return Math.ceil(maxCount * 1.1 / 50) * 50; // Round up to nearest 50
    };

    return (
        <div className="py-8">
            {/* Controls Section */}
            <section className="bg-gray-50 py-8">
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
                                        <option value="ownership-age">Land Ownership by Age Bracket</option>
                                        <option value="landsize-gender">Land Size by Gender</option>
                                        <option value="landsize-age">Land Size by Age Bracket</option>
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

            {/* Charts Section */}
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
                                            <BarChart data={groupedData} margin={{ top: 30, right: 30, left: 20, bottom: 80 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="category"
                                                    tick={{ fontSize: 12 }}
                                                    height={60}
                                                />
                                                <YAxis domain={[0, getMaxValue()]} />
                                                <Tooltip content={<CustomTooltip />} />
                                                {types.filter(type => currentData.some(item => item.type === type)).map((type, index) => (
                                                    <Bar
                                                        key={type}
                                                        dataKey={type}
                                                        fill={getColor(null, type)}
                                                        radius={[2, 2, 0, 0]}
                                                        name={type}
                                                    >
                                                        <LabelList
                                                            content={(props) => {
                                                                const { x, y, width, height, value, payload } = props;
                                                                if (value < 20) return null;

                                                                const originalDataPoint = currentData.find(item =>
                                                                    item.category === payload.category && item.type === type
                                                                );

                                                                if (!originalDataPoint) return null;

                                                                return (
                                                                    <text
                                                                        x={x + width / 2}
                                                                        y={y + height / 2}
                                                                        fill="white"
                                                                        textAnchor="middle"
                                                                        dominantBaseline="middle"
                                                                        fontSize="12"
                                                                        fontWeight="bold"
                                                                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                                                                    >
                                                                        {originalDataPoint.percent}%
                                                                    </text>
                                                                );
                                                            }}
                                                        />
                                                    </Bar>
                                                ))}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}

                                    {chartType === 'stacked' && (
                                        <ResponsiveContainer width="100%" height={500}>
                                            <BarChart data={stackedData} margin={{ top: 30, right: 30, left: 20, bottom: 80 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="type"
                                                    tick={{ fontSize: 11 }}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={100}
                                                />
                                                <YAxis domain={[0, getMaxValue()]} />
                                                <Tooltip content={<CustomTooltip />} />
                                                {categories.filter(cat => currentData.some(item => item.category === cat)).map((category, index) => (
                                                    <Bar
                                                        key={category}
                                                        dataKey={category}
                                                        stackId="a"
                                                        fill={getColor(category, null)}
                                                        name={category}
                                                    >
                                                        <LabelList
                                                            content={(props) => {
                                                                const { x, y, width, height, value, payload } = props;
                                                                if (value < 20) return null;

                                                                const originalDataPoint = currentData.find(item =>
                                                                    item.type === payload.type && item.category === category
                                                                );

                                                                if (!originalDataPoint) return null;

                                                                return (
                                                                    <text
                                                                        x={x + width / 2}
                                                                        y={y + height / 2}
                                                                        fill="white"
                                                                        textAnchor="middle"
                                                                        dominantBaseline="middle"
                                                                        fontSize="12"
                                                                        fontWeight="bold"
                                                                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                                                                    >
                                                                        {originalDataPoint.percent}%
                                                                    </text>
                                                                );
                                                            }}
                                                        />
                                                    </Bar>
                                                ))}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}

                                    {chartType === 'relationship' && (
                                        <ResponsiveContainer width="100%" height={500}>
                                            <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="category"
                                                    tick={{ fontSize: 11 }}
                                                    height={60}
                                                />
                                                <YAxis yAxisId="left" domain={[0, getMaxValue()]} />
                                                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar
                                                    yAxisId="left"
                                                    dataKey="count"
                                                    fill="#16a34a"
                                                    fillOpacity={0.6}
                                                    radius={[2, 2, 0, 0]}
                                                    name="count"
                                                >
                                                    <LabelList
                                                        content={(props) => {
                                                            const { x, y, width, height, value } = props;
                                                            if (value < 20) return null;

                                                            return (
                                                                <text
                                                                    x={x + width / 2}
                                                                    y={y + height / 2}
                                                                    fill="white"
                                                                    textAnchor="middle"
                                                                    dominantBaseline="middle"
                                                                    fontSize="12"
                                                                    fontWeight="bold"
                                                                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                                                                >
                                                                    {value}
                                                                </text>
                                                            );
                                                        }}
                                                    />
                                                </Bar>
                                                <Line
                                                    yAxisId="right"
                                                    type="monotone"
                                                    dataKey="percent"
                                                    stroke="#dc2626"
                                                    strokeWidth={3}
                                                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                                                    name="percent"
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

                        {/* Summary Cards */}
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
                                                    className="h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${item.percent}%`,
                                                        backgroundColor: getColor(item.category, item.type)
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-700">{item.percent}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Data Table */}
                        {showDataTable && currentData.length > 0 && (
                            <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-gray-600" />
                                        <h3 className="text-lg font-semibold text-gray-900">Data Table</h3>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentData.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="w-3 h-3 rounded-full mr-3"
                                                                style={{ backgroundColor: getColor(item.category, item.type) }}
                                                            ></div>
                                                            <span className="text-sm font-medium text-gray-900">{item.category}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.type === 'nan' ? 'No Land' : item.type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                                        {item.count}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex items-center">
                                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                                                                <div
                                                                    className="h-2 rounded-full"
                                                                    style={{
                                                                        width: `${item.percent}%`,
                                                                        backgroundColor: getColor(item.category, item.type)
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-medium">{item.percent}%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Key Insights */}
                        {currentData.length > 0 && (
                            <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <h4 className="font-medium text-gray-800 mb-2">Total Records</h4>
                                        <p className="text-2xl font-bold text-blue-600">{currentData.length}</p>
                                        <p className="text-sm text-gray-600">Data points displayed</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <h4 className="font-medium text-gray-800 mb-2">Average Count</h4>
                                        <p className="text-2xl font-bold text-green-600">
                                            {Math.round(currentData.reduce((sum, item) => sum + item.count, 0) / currentData.length)}
                                        </p>
                                        <p className="text-sm text-gray-600">Per category/type</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                                    <h4 className="font-medium text-gray-800 mb-2">Distribution Summary</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {currentData
                                            .sort((a, b) => b.count - a.count)
                                            .slice(0, 3)
                                            .map((item, index) => (
                                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                                                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: getColor(item.category, item.type) }}></span>
                                                    {item.category} - {item.type === 'nan' ? 'No Land' : item.type}: {item.count} ({item.percent}%)
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandOwnership;
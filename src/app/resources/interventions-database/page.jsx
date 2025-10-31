'use client';
import { useState, useMemo, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Globe, DollarSign, MapPin, Activity, Calendar } from "lucide-react";
import projectsData from "../../../../data/data/projects.json";
import LamaNavbar from "@/components/Navbar/navbar";
import LamaFooter from "@/components/Footer/footer";

// Lazy load the ClimateMap component
const ClimateMap = lazy(() => import("@/components/ClimateMap"));

// Loading component for the map
const MapLoader = () => (
    <div className="h-[500px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
    </div>
);

export default function ClimateAdaptationDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("all");
    const [selectedTheme, setSelectedTheme] = useState("all");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedPeriod, setSelectedPeriod] = useState("all");

    const projects = projectsData;

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                searchQuery === "" ||
                project["Adaptation Interventions"].toLowerCase().includes(searchQuery.toLowerCase()) ||
                project["Country"].toLowerCase().includes(searchQuery.toLowerCase()) ||
                project["Funders"].toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCountry =
                selectedCountry === "all" || project["Country"] === selectedCountry;

            const matchesTheme =
                selectedTheme === "all" || project["Thematic Area(s)"] === selectedTheme;

            const matchesRegion =
                selectedRegion === "all" || project["Region"] === selectedRegion;

            const matchesPeriod =
                selectedPeriod === "all" || project["Period"] === selectedPeriod;

            return matchesSearch && matchesCountry && matchesTheme && matchesRegion && matchesPeriod;
        });
    }, [projects, searchQuery, selectedCountry, selectedTheme, selectedRegion, selectedPeriod]);

    // Group projects by country for combined view - NO DUPLICATES
    const projectsByCountry = useMemo(() => {
        const grouped = {};

        projects.forEach(project => {
            if (!grouped[project.Country]) {
                grouped[project.Country] = [];
            }
            grouped[project.Country].push(project);
        });

        return grouped;
    }, [projects]);

    const statistics = useMemo(() => {
        const totalProjects = filteredProjects.length;
        const totalFunding = filteredProjects.reduce(
            (sum, project) => sum + parseFloat(project["Project Amount ($ Million)"] || "0"),
            0
        );

        const uniqueCountries = selectedPeriod === "all"
            ? Object.keys(projectsByCountry).length
            : new Set(filteredProjects.map((project) => project["Country"])).size;

        const activeProjects = filteredProjects.filter(
            (project) => project["Implementation Status"] === "Under Implementation"
        ).length;

        return {
            totalProjects,
            totalFunding,
            uniqueCountries,
            activeProjects,
        };
    }, [filteredProjects, projectsByCountry, selectedPeriod]);

    const countries = useMemo(() => {
        const uniqueCountries = new Set(projects.map((project) => project["Country"]));
        return Array.from(uniqueCountries).sort();
    }, [projects]);

    const themes = useMemo(() => {
        const uniqueThemes = new Set(projects.map((project) => project["Thematic Area(s)"]));
        return Array.from(uniqueThemes).sort();
    }, [projects]);

    const regions = useMemo(() => {
        const uniqueRegions = new Set(projects.map((project) => project["Region"]));
        return Array.from(uniqueRegions).sort();
    }, [projects]);

    // Remove duplicates from periods using Set
    const periods = useMemo(() => {
        const uniquePeriods = new Set(projects.map((project) => project["Period"]));
        return Array.from(uniquePeriods).sort((a, b) => {
            // Sort periods by year (extract start year and compare)
            const getStartYear = (period) => {
                const year = period.split('-')[0];
                return parseInt(year) || 0;
            };
            return getStartYear(a) - getStartYear(b);
        });
    }, [projects]);

    // Function to render projects based on whether we're filtering by period
    const renderProjects = () => {
        if (selectedPeriod === "all") {
            // Combined view - group by country (NO DUPLICATES)
            const filteredCountries = countries.filter(country =>
                projectsByCountry[country]?.some(project =>
                    filteredProjects.some(filteredProject =>
                        filteredProject["Adaptation Interventions"] === project["Adaptation Interventions"]
                    )
                )
            );

            if (filteredCountries.length === 0) {
                return (
                    <div className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <Activity className="h-8 w-8 text-gray-300" />
                            <p className="text-lg font-medium text-gray-400">No projects found</p>
                            <p className="text-sm text-gray-500">
                                Try adjusting your search criteria or filters
                            </p>
                        </div>
                    </div>
                );
            }

            return filteredCountries.map((country) => {
                const countryProjects = projectsByCountry[country].filter(project =>
                    filteredProjects.some(filteredProject =>
                        filteredProject["Adaptation Interventions"] === project["Adaptation Interventions"]
                    )
                );

                if (countryProjects.length === 0) return null;

                return (
                    <div key={country} className="mb-6 last:mb-0">
                        <div className="bg-gray-50 p-4 rounded-lg mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">{country}</h3>
                            <p className="text-sm text-gray-600">
                                {countryProjects.length} project{countryProjects.length !== 1 ? 's' : ''} •
                                Total: ${countryProjects.reduce((sum, p) => sum + parseFloat(p["Project Amount ($ Million)"] || "0"), 0).toLocaleString()}M
                            </p>
                        </div>
                        <div className="space-y-3">
                            {countryProjects.map((project, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                                {project["Adaptation Interventions"]}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {project.Instruments && project.Instruments !== "none" ? project.Instruments : "No specific instrument"}
                                            </p>
                                        </div>
                                        <div>
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs mb-2">
                                                {project["Thematic Area(s)"]}
                                            </Badge>
                                            <p className="text-sm text-gray-600">{project["Region"]}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{project["Funders"]}</p>
                                            <p className="text-sm text-gray-700">{project["Period"]}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 text-lg">
                                                ${parseFloat(project["Project Amount ($ Million)"]).toLocaleString()}M
                                            </p>
                                            <Badge className={`
                        ${project["Implementation Status"] === "Under Implementation"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                } border-0 text-xs font-medium
                      `}>
                                                {project["Implementation Status"]}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            });
        } else {
            // Individual view when filtering by period
            return (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Theme</TableHead>
                            <TableHead>Funders</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.map((project, index) => (
                            <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                <TableCell className="font-medium max-w-md py-4">
                                    <div className="space-y-1">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {project["Adaptation Interventions"]}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {project.Instruments && project.Instruments !== "none" ? project.Instruments : "No specific instrument"}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-sm text-gray-700">{project["Region"]}</span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="font-medium text-gray-900">{project["Country"]}</span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Badge
                                        variant="secondary"
                                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 text-xs"
                                    >
                                        {project["Thematic Area(s)"]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-sm text-gray-600">{project["Funders"]}</span>
                                </TableCell>
                                <TableCell className="text-right py-4">
                                    <span className="font-semibold text-gray-900">
                                        ${parseFloat(project["Project Amount ($ Million)"]).toLocaleString()}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-sm text-gray-700">{project["Period"]}</span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Badge className={`
                    ${project["Implementation Status"] === "Under Implementation"
                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                        } border-0 text-xs font-medium
                  `}>
                                        {project["Implementation Status"]}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
    };

    return (
        <>
            <LamaNavbar />



            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                <div className="container mx-auto px-4 py-8">
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Climate Adaptation Projects Dashboard
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Track climate resilience and adaptation projects across Africa
                        </p>
                    </header>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
                                <Activity className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{statistics.totalProjects}</div>
                                <p className="text-xs text-gray-500 mt-1">Active initiatives</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Total Funding</CardTitle>
                                <DollarSign className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    ${statistics.totalFunding.toFixed(1)}M
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Investment committed</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {selectedPeriod === "all" ? "Countries" : "Active Countries"}
                                </CardTitle>
                                <Globe className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{statistics.uniqueCountries}</div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {selectedPeriod === "all" ? "Regional coverage" : "Countries in period"}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
                                <MapPin className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">{statistics.activeProjects}</div>
                                <p className="text-xs text-gray-500 mt-1">Currently running</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card className="bg-white shadow-lg mb-8 border-0">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold text-gray-900">Filter Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Search Projects
                                    </label>
                                    <Input
                                        placeholder="Search by title, country, or funder..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Region
                                    </label>
                                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Regions</SelectItem>
                                            {regions.map((region) => (
                                                <SelectItem key={region} value={region}>
                                                    {region}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Countries</SelectItem>
                                            {countries.map((country) => (
                                                <SelectItem key={country} value={country}>
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Thematic Area
                                    </label>
                                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Themes</SelectItem>
                                            {themes.map((theme) => (
                                                <SelectItem key={theme} value={theme}>
                                                    {theme}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Period
                                    </label>
                                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Periods</SelectItem>
                                            {periods.map((period) => (
                                                <SelectItem key={period} value={period}>
                                                    {period}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Map Section */}
                    <Card className="bg-white shadow-lg mb-8 border-0">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold text-gray-900">Project Locations</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                                {filteredProjects.length} project(s) found • {statistics.uniqueCountries} countr{statistics.uniqueCountries !== 1 ? 'ies' : 'y'}
                            </p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Suspense fallback={<MapLoader />}>
                                <ClimateMap projects={filteredProjects} />
                            </Suspense>
                        </CardContent>
                    </Card>

                    {/* Projects List */}
                    <Card className="bg-white shadow-lg mb-8 border-0">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold text-gray-900">Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderProjects()}
                        </CardContent>
                    </Card>


                </div>
            </div>
            <LamaFooter />
        </>
    );
}
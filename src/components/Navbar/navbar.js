"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Menu,
  X,
  Users,
  Target,
  Database,
  FileText,
  Calendar,
  Camera,
  Mail,
  Home,
  Info,
} from "lucide-react";
import Image from "next/image";

const LamaNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getActiveTab = () => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/about")) return "About";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/resources")) return "Resources";
    if (pathname.startsWith("/stakeholders")) return "Stakeholders";
    if (pathname.startsWith("/activities")) return "Activities";
    if (pathname.startsWith("/gallery")) return "gallery";
    return "";
  };

  const menuItems = [
    {
      name: "Home",
      icon: <Home className="w-4 h-4" />,
      href: "/",
    },
    {
      name: "About",
      icon: <Info className="w-4 h-4" />,
      href: "/about",
    },
    {
      name: "Dashboard",
      icon: <Target className="w-4 h-4" />,
      href: "/dashboard",
      subItems: [
        {
          name: "Test",
          href: "/dashboard/test",
        },
        {
          name: "Interactive Indicators & Visualizations",
          href: "/dashboard/indicators",
        },

        { name: "Impact Stories", href: "/dashboard/impact-stories" },
      ],
    },
    {
      name: "Resources",
      icon: <Database className="w-4 h-4" />,
      href: "/resources",
      subItems: [
        {
          name: "LLA Interventions Database",
          href: "/resources/interventions-database",
          description: "Projects & lessons learned",
        },
        {
          name: "Tools & Frameworks",
          href: "/resources/tools-frameworks",
          description: "Guides, documents, data",
        },
        {
          name: "Advisory/Expert Group Outputs",
          href: "/resources/advisory-outputs",
        },
      ],
    },
    {
      name: "Stakeholders",
      icon: <Users className="w-4 h-4" />,
      href: "/stakeholders",
      subItems: [
        { name: "Stakeholder Directory", href: "/stakeholders/directory" },
        {
          name: "LAMA Diaries & Blogs",
          href: "/stakeholders/diaries-blogs",
          description: "Voices of women, youth, communities, experts",
        },
        { name: "Collaboration Space", href: "/stakeholders/collaboration" },
      ],
    },
    {
      name: "Activities",
      icon: <Calendar className="w-4 h-4" />,
      href: "/activities",
      subItems: [
        { name: "Webinars", href: "/activities/webinars" },
        { name: "Workshops", href: "/activities/workshops" },
        {
          name: "Events",
          href: "/activities/events",
          description: "Platform Launch & more",
        },
      ],
    },
    {
      name: "Gallery",
      icon: <Camera className="w-4 h-4" />,
      href: "/gallery",
    },
  ];

  const handleTabClick = (tabName) => {
    setMobileMenuOpen(false);
  };

  const activeTab = getActiveTab();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            {/* Replace this Image component with your actual logo */}
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png" // Replace with your actual logo path
                alt="LAMA Platform Logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">LAMA</span>
              <span className="text-xs text-gray-500">Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 max-w-none">
            <div className="flex space-x-1 justify-center xl:justify-end">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-50 flex items-center space-x-1 xl:space-x-2 whitespace-nowrap ${
                          activeTab === item.name
                            ? "bg-[#e7f2e6] text-green-700 shadow-sm"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                        onClick={() => router.push(item.href)}
                      >
                        {item.icon}
                        <span className="hidden xl:inline">{item.name}</span>
                        <span className="xl:hidden">
                          {item.name.substring(0, 8)}
                          {item.name.length > 8 ? "..." : ""}
                        </span>
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Optimized dropdown with smaller width and better spacing */}
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-3">
                          <div className="space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block p-2.5 rounded-md hover:bg-gray-50 transition-colors duration-150 group/item"
                              >
                                <div className="font-medium text-gray-900 text-sm leading-tight group-hover/item:text-green-700 transition-colors">
                                  {subItem.name}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-500 mt-1 leading-tight">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 xl:space-x-2 whitespace-nowrap ${
                        activeTab === item.name
                          ? "bg-[#e7f2e6] text-green-700 shadow-sm"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      <span className="hidden xl:inline">{item.name}</span>
                      <span className="xl:hidden">
                        {item.name.substring(0, 8)}
                        {item.name.length > 8 ? "..." : ""}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <Link
                  href={item.href}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    activeTab === item.name
                      ? "bg-[#e7f2e6] text-green-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTabClick(item.name)}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.subItems && <ChevronDown className="w-4 h-4" />}
                </Link>

                {item.subItems && activeTab === item.name && (
                  <div className="pl-8 space-y-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="font-medium">{subItem.name}</div>
                        {subItem.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LamaNavbar;

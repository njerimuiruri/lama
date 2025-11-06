"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

const LamaNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const getActiveTab = () => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/about")) return "About";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/resources")) return "Resources";
    if (pathname.startsWith("/stakeholders")) return "Stakeholders";
    if (pathname.startsWith("/activities")) return "Activities";
    if (pathname.startsWith("/gallery")) return "Gallery";
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
      name: "Program",
      icon: <GraduationCap className="w-4 h-4" />,
      href: "/programmes",
    },

    {
      name: "Components",
      icon: <Target className="w-4 h-4" />,
      href: "/dashboard/sitedashboard",
      subItems: [
        // {
        //   name: "Test",
        //   href: "/dashboard/test",
        // },
        {
          name: "Interactive dashboard",
          href: "/dashboard/sitedashboard",
        },
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
        // { name: "Stakeholder Directory", href: "/stakeholders/directory" },
        { name: "Impact Stories", href: "/dashboard/impact-stories" },
      ],
    },
    {
      name: "Resources",
      icon: <Database className="w-4 h-4" />,
      href: "/resources/interventions-database",
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
        // {
        //   name: "Stakeholder Engagement Directory",
        //   href: "/stakeholders/directory",
        // },

        {
          name: "Advisory/Expert Group Outputs",
          href: "/resources/advisory_outputs",
        },
      ],
    },
    {
      name: "Stakeholders",
      icon: <Users className="w-4 h-4" />,
      href: "/resources/advisory_outputs",
      subItems: [
        { name: "Stakeholder Directory", href: "/resources/advisory_outputs" },
        {
          name: "LAMA Diaries & Blogs",
          href: "/stakeholders/diaries-blogs",
          description: "Voices of women, youth, communities, experts",
        },
        // { name: "Collaboration Space", href: "/stakeholders/collaboration" },
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
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (itemName) => {
    setOpenSubMenu(openSubMenu === itemName ? null : itemName);
  };

  const activeTab = getActiveTab();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
              <Image
                src="/images/LAMA-logo.png"
                alt="LAMA Logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-lg sm:text-xl text-gray-900 truncate">
                LAMA
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-end items-center ml-4">
            <div className="flex space-x-1">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-50 flex items-center space-x-1 whitespace-nowrap ${
                          activeTab === item.name
                            ? "bg-[#e7f2e6] text-green-700 shadow-sm"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                        onClick={() => router.push(item.href)}
                      >
                        <span className="hidden xl:flex xl:items-center xl:space-x-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </span>
                        <span className="xl:hidden flex items-center space-x-1">
                          {item.icon}
                          <span className="max-w-[60px] truncate">
                            {item.name}
                          </span>
                        </span>
                        <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 transition-transform group-hover:rotate-180 flex-shrink-0" />
                      </button>

                      {/* Desktop Dropdown */}
                      <div className="absolute top-full left-0 mt-1 w-56 xl:w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-2 xl:p-3">
                          <div className="space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block p-2 xl:p-2.5 rounded-md hover:bg-gray-50 transition-colors duration-150 group/item"
                              >
                                <div className="font-medium text-gray-900 text-xs xl:text-sm leading-tight group-hover/item:text-green-700 transition-colors">
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
                      className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 whitespace-nowrap ${
                        activeTab === item.name
                          ? "bg-[#e7f2e6] text-green-700 shadow-sm"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <span className="hidden xl:flex xl:items-center xl:space-x-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                      <span className="xl:hidden flex items-center space-x-1">
                        {item.icon}
                        <span className="max-w-[60px] truncate">
                          {item.name}
                        </span>
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 h-9 w-9 sm:h-10 sm:w-10"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex-1 text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                      activeTab === item.name
                        ? "bg-[#e7f2e6] text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => !item.subItems && handleTabClick(item.name)}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      {item.icon}
                      <span className="truncate">{item.name}</span>
                    </div>
                  </Link>
                  {item.subItems && (
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="p-2 text-gray-700 hover:bg-gray-50 rounded-md ml-1"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSubMenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.subItems && openSubMenu === item.name && (
                  <div className="pl-6 sm:pl-8 space-y-1 pb-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-3 sm:px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
                        onClick={() => handleTabClick(item.name)}
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

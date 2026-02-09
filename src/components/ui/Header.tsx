"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, Home, BookOpen, Trophy, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import HeaderLogo from '@/app/assets/icons/header-logo-blue.svg'
import Image from "next/image";
import { api } from "@/lib/api";
import { CourseCatalog} from '@/lib/types';


import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [courses, setCourses] = useState<CourseCatalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
     loadCourses();

  })
  
  const loadCourses = async () => {
  
    try {
      setLoading(true);
      const [catalogRes] = await Promise.all([
        api.getCourseCatalog(),
      ]);

      const allCourses = catalogRes.data;
      setCourses(allCourses);


    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };
  
    

  const coursesMenu = [
    { label: "AI Fundamentals", href: "/courses/ai-fundamentals" },
    { label: "Machine Learning", href: "/courses/machine-learning" },
    { label: "Deep Learning", href: "/courses/deep-learning" },
    { label: "Data Science", href: "/courses/data-science" },
    { label: "NLP Specialization", href: "/courses/nlp" },
    { label: "Computer Vision", href: "/courses/computer-vision" },
  ];

  const resourcesMenu = [
    { label: "Blog & Articles", href: "/blogs" },
    { label: "Announcements", href: "/announcements" },

  ];

  

   const navigation = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Courses', href: '/courses', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Quizzes', href: '/quiz', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Dashboard', href: '/dashboard', icon: <Settings className="w-5 h-5" /> },
  ];


  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay before closing
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 shadow-sm shadow-gray-100/40 h-[5rem] md:h-[7rem] flex items-center z-50 w-full border-b border-gray-200 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 md:space-x-4">
              <Image src={HeaderLogo} alt="header logo" width={200} height={200} className="w-[2rem] md:w-[3rem]" />
              <p className="text-blue-900 font-bold text-xl lg:text-2xl flex gap-2">Laudare <span>AI</span> <span className="hidden lg:block">Academy</span><span className="lg:hidden">Aca..</span></p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Courses Dropdown */}
            <div 
              className="relative"
              
            >
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
                
              >
                <Link href="/courses" className="font-medium">Explore Courses</Link>
                <ChevronDown
                onMouseEnter={() => handleMouseEnter("courses")}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "h-4 w-4 transition-transform",
                  activeDropdown === "courses" && "rotate-180"
                )} />
              </button>

              {activeDropdown === "courses" && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white w-56 rounded-lg shadow-lg border border-gray-200 z-50"
                  onMouseEnter={() => handleMouseEnter("courses")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-2">
                    
                    {courses.map((item) => (
                      
                      <Link
                        key={item.id}
                        href={"/courses/" + item.slug}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                        onClick={closeMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              
            >
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
              >
                <span className="font-medium">Updates</span>
                <ChevronDown
                onMouseEnter={() => handleMouseEnter("resources")}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "h-4 w-4 transition-transform",
                  activeDropdown === "resources" && "rotate-180"
                )} />
              </button>

              {activeDropdown === "resources" && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white w-56 rounded-lg shadow-lg border border-gray-200 z-50"
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-2">
                    {resourcesMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-800 transition-colors"
            >
              About us
            </Link>

            {/* Simple Link */}
            <Link
              href="/privacy-policy"
              className="font-medium text-gray-700 hover:text-blue-800 transition-colors"
            >
              Privacy Policy
            </Link>

           

           
          </nav>


          {/* User Profile / Auth */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-[9999]">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                 {/* CTA Buttons */}
                  <Link href={"/register"} className="flex items-center space-x-4">
                    <Button variant="cta" size="lg" className="text-white flex gap-2 shadow-lg md:text-xl">
                      <span>Start</span> <span className="hidden md:block">Learning</span>
                    </Button>
                  </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-blue-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            
          </div>

          
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden p-4 w-full border-t fixed backdrop-blur supports-[backdrop-filter]:bg-white border-gray-200 py-6 shadow-lg shadow-b left-0">
            <div className="space-y-4">
              {/* Mobile Courses Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "courses" ? null : "courses")}
                  className="flex w-full items-center justify-between text-gray-700 hover:text-blue-800"
                >
                  <span className="font-medium">Explore Courses</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    activeDropdown === "courses" && "rotate-180"
                  )} />
                </button>
                {activeDropdown === "courses" && (
                  <div className="ml-4 space-y-2 border-l border-gray-200 pl-4">
                    {courses.map((item) => (
                      <Link
                        key={item.id}
                        href={"/courses/" + item.slug}
                        className="block py-2 text-gray-600 hover:text-blue-800"
                        onClick={closeMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Resources Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
                  className="flex w-full items-center justify-between text-gray-700 hover:text-blue-800"
                >
                  <span className="font-medium">News Letter</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    activeDropdown === "resources" && "rotate-180"
                  )} />
                </button>
                {activeDropdown === "resources" && (
                  <div className="ml-4 space-y-2 border-l border-gray-200 pl-4">
                    {resourcesMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-blue-800"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Simple Link */}
              <Link
                href="/about"
                className="block font-medium text-gray-700 hover:text-blue-800 py-2"
                onClick={closeMenu}
              >
                About Us
              </Link>

              {/* Mobile CTA Buttons */}
              <Link href={"/register"} className="pt-4 space-y-3">
                <Button variant="cta" size="lg" className="w-full text-white">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
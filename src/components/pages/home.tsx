import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

import {
  BarChart3,
  Building2,
  ChevronRight,
  ClipboardList,
  DollarSign,
  FileText,
  Settings,
  User,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.9)] backdrop-blur-md border-b border-orange-100">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl text-orange-600">
              TigFin
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Solutions
            </Link>
            <Link
              to="/"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Resources
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-orange-600"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer border-2 border-orange-200">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback className="bg-orange-100 text-orange-800">
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-orange-600"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-md bg-orange-600 text-white hover:bg-orange-700 text-sm px-4 shadow-md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                  <span className="text-orange-600">TigFin</span> - Business
                  Management Suite
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-6">
                  All-in-one platform to streamline your business operations
                </h2>
                <p className="text-gray-600 mb-8">
                  Manage clients, track finances, and oversee projects with our
                  intuitive cloud-based solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button className="w-full sm:w-auto rounded-md bg-orange-600 text-white hover:bg-orange-700 px-6 py-3 text-base font-medium shadow-md">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-md border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3 text-base font-medium"
                    >
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-xl shadow-xl p-6 border border-orange-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Financial Overview
                    </h3>
                    <span className="text-sm text-gray-500">Last 30 days</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-md">
                          <DollarSign className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Revenue</p>
                          <p className="text-xl font-bold text-gray-800">
                            $24,500
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Invoices</p>
                          <p className="text-xl font-bold text-gray-800">18</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <BarChart3 className="h-24 w-24 text-gray-300" />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Jan</span>
                    <span className="text-gray-500">Feb</span>
                    <span className="text-gray-500">Mar</span>
                    <span className="text-gray-500">Apr</span>
                    <span className="text-gray-500">May</span>
                    <span className="text-gray-500">Jun</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-100 rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-orange-200 rounded-full z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Comprehensive Business Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run your business efficiently in one
                platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Client Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Store client information, documents, and track communication
                  history in one place.
                </p>
                <Link
                  to="/"
                  className="text-orange-600 font-medium flex items-center hover:text-orange-700"
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Financial Tracking
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage invoices, track payments, and get real-time insights
                  into your finances.
                </p>
                <Link
                  to="/"
                  className="text-orange-600 font-medium flex items-center hover:text-orange-700"
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Project Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Plan, track, and manage projects with task assignments and
                  milestone tracking.
                </p>
                <Link
                  to="/"
                  className="text-orange-600 font-medium flex items-center hover:text-orange-700"
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  HR Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage employee information, track time off, and handle
                  performance reviews.
                </p>
                <Link
                  to="/"
                  className="text-orange-600 font-medium flex items-center hover:text-orange-700"
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-20 bg-orange-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Trusted by Businesses Worldwide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See what our customers have to say about TigFin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-orange-500 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "TigFin has transformed how we manage our business. The
                  financial tracking features have saved us countless hours and
                  helped us make better decisions."
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" />
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Sarah Robinson
                    </h4>
                    <p className="text-sm text-gray-500">
                      CEO, Bright Solutions
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-orange-500 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "The client management system is intuitive and powerful. We
                  can now keep track of all client interactions and documents in
                  one place."
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" />
                    <AvatarFallback>TJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">Tom Jackson</h4>
                    <p className="text-sm text-gray-500">
                      Director, Apex Consulting
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-orange-500 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  "Project management has never been easier. The ability to
                  track milestones and assign tasks has improved our team's
                  productivity significantly."
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">Maria Lee</h4>
                    <p className="text-sm text-gray-500">
                      Project Manager, Innovate Inc
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20">
          <div className="max-w-[1000px] mx-auto px-4">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to streamline your business?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that use TigFin to manage their
                operations efficiently.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 text-base font-medium rounded-md shadow-md">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-orange-700 px-6 py-3 text-base font-medium rounded-md"
                  >
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
            <div>
              <h3 className="font-bold text-xl text-orange-500 mb-4">TigFin</h3>
              <p className="text-gray-400 mb-4">
                All-in-one business management platform for modern businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-300 mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-300 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-300 mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-orange-500">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TigFin. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/"
                className="text-gray-400 hover:text-orange-500 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-orange-500 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-orange-500 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

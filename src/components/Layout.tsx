import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Tv, Menu, X, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 glass-panel">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                                <Tv className="w-6 h-6 text-primary-600" />
                            </div>
                            <span className="font-display font-bold text-xl text-primary-800">Bigg Boss 9</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}>Home</Link>
                            <Link to="/voting" className={`text-sm font-medium transition-colors ${isActive('/voting') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}>Voting</Link>
                            <Link to="/results" className={`text-sm font-medium transition-colors ${isActive('/results') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}>Results</Link>
                            <Link to="/social" className={`text-sm font-medium transition-colors ${isActive('/social') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}>Social</Link>
                            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}>About</Link>
                        </nav>

                        <div className="hidden md:block">
                            <Link to="/voting" className="btn btn-primary py-2 px-4 text-xs">Vote Now</Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                        <Link to="/" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/voting" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Voting</Link>
                        <Link to="/results" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Results</Link>
                        <Link to="/social" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Social</Link>
                        <Link to="/about" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link to="/voting" className="btn btn-primary w-full justify-center" onClick={() => setIsMenuOpen(false)}>Vote Now</Link>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Tv className="w-6 h-6 text-primary-600" />
                                <span className="font-display font-bold text-xl text-primary-800">Bigg Boss 9</span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-md">
                                The ultimate destination for Bigg Boss Telugu Season 9 voting, updates, and community discussions.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-gray-500 hover:text-primary-600 text-sm">Home</Link></li>
                                <li><Link to="/voting" className="text-gray-500 hover:text-primary-600 text-sm">Vote Now</Link></li>
                                <li><Link to="/results" className="text-gray-500 hover:text-primary-600 text-sm">Live Results</Link></li>
                                <li><Link to="/social" className="text-gray-500 hover:text-primary-600 text-sm">Social Media</Link></li>
                                <li><Link to="/about" className="text-gray-500 hover:text-primary-600 text-sm">About Show</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8 text-center">
                        <p className="text-gray-400 text-sm">&copy; 2025 Bigg Boss 9 Telugu Voting. All rights reserved.</p>
                        <p className="text-gray-400 text-xs mt-2">Disclaimer: This is an unofficial voting platform. We are not affiliated with Star Maa or Endemol Shine India.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

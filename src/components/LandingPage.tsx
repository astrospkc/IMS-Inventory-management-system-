

import { motion } from "framer-motion";
import { BarChart2, PieChart, Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div
            className="min-h-screen text-white"
            style={{
                background:
                    "radial-gradient(circle at center, #1f1f1f, #0f0f0f, #2d0a48)",
            }}
        >
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 relative">
                <h1 className="text-2xl font-bold">InventoryPro</h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <a href="#features" className="hover:text-gray-300">
                        Features
                    </a>
                    <a href="#charts" className="hover:text-gray-300">
                        Analytics
                    </a>
                    <a href="#contact" className="hover:text-gray-300">
                        Contact
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <div className="absolute top-16 right-8 bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col space-y-4 md:hidden">
                        <a
                            href="#features"
                            className="hover:text-gray-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#charts"
                            className="hover:text-gray-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Analytics
                        </a>
                        <a
                            href="#contact"
                            className="hover:text-gray-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </a>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-20">
                <motion.h2
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    Smarter Inventory Management
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl max-w-2xl text-gray-300 mb-8"
                >
                    Track, manage, and analyze your stock with powerful tools & insights.
                </motion.p>
                {/* when user is logged in this button won't show up */}
                <Link to="/getStarted">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-lg font-medium"
                    >
                        Get Started
                    </motion.button>
                </Link>

            </section>

            {/* Features Section */}
            <section id="features" className="px-8 py-16 grid md:grid-cols-3 gap-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gray-800/60 backdrop-blur rounded-2xl shadow-lg text-center"
                >
                    <Package className="mx-auto mb-4 w-10 h-10 text-indigo-400" />
                    <h3 className="text-xl font-semibold mb-2">Product Tracking</h3>
                    <p className="text-gray-400">
                        Keep track of all products, stock levels, and suppliers.
                    </p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gray-800/60 backdrop-blur rounded-2xl shadow-lg text-center"
                >
                    <BarChart2 className="mx-auto mb-4 w-10 h-10 text-indigo-400" />
                    <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                    <p className="text-gray-400">
                        Get insights with sales charts and inventory trends.
                    </p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gray-800/60 backdrop-blur rounded-2xl shadow-lg text-center"
                >
                    <PieChart className="mx-auto mb-4 w-10 h-10 text-indigo-400" />
                    <h3 className="text-xl font-semibold mb-2">Reports</h3>
                    <p className="text-gray-400">
                        Download reports to make smarter business decisions.
                    </p>
                </motion.div>
            </section>

            {/* Charts Section */}
            <section id="charts" className="px-8 py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Visualize Your Data</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                    Below is a placeholder for charts and graphs (like sales performance,
                    stock trends, etc).
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800/60 backdrop-blur rounded-2xl p-6 shadow-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">[ Bar Chart Placeholder ]</span>
                    </div>
                    <div className="bg-gray-800/60 backdrop-blur rounded-2xl p-6 shadow-lg h-64 flex items-center justify-center">
                        <span className="text-gray-500">[ Pie Chart Placeholder ]</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                id="contact"
                className="px-8 py-10 text-center text-gray-500 mt-10"
            >
                © {new Date().getFullYear()} InventoryPro. All rights reserved.
            </footer>
        </div>
    );
}

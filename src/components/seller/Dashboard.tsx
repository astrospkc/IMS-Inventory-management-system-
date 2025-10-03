import { useEffect } from "react";
import useProductStore from "../../store/useProductStore.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import Navbar from "../seller/Navbar.tsx"


type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    availability: string;
    stock: number;
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

const SellerDashboard = () => {
    const { setProducts, products, error } = useProductStore();

    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/getAllProducts`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return data;
        },
    });

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data, setProducts]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-xl animate-pulse">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-xl text-red-500">Error loading products</div>
            </div>
        );
    }

    // Prepare data for charts
    const categoryData = Object.values(
        products.reduce((acc: any, product: Product) => {
            if (!acc[product.category]) {
                acc[product.category] = { category: product.category, stock: 0 };
            }
            acc[product.category].stock += product.stock;
            return acc;
        }, {})
    );

    const priceData = products.map((p) => ({
        name: p.name,
        price: p.price,
    }));

    const getAvailabilityClasses = (status: string) => {
        switch (status) {
            case "in_stock":
                return "bg-green-600/20 shadow-sm shadow-green-600 text-white px-2 py-1 rounded-full text-sm font-medium";
            case "out_of_stock":
                return "bg-red-600/20 shadow-sm shadow-red-600 text-white px-2 py-1 rounded-full text-sm font-medium";
            case "limited_stock":
                return "bg-yellow-500/20 shadow-sm shadow-yellow-500 text-black px-2 py-1 rounded-full text-sm font-medium";
            case "pre_order":
                return "bg-blue-500/20  shadow-sm shadow-blue-500 text-white px-2 py-1 rounded-full text-sm font-medium";
            case "backorder":
                return "bg-purple-600/20 shadow-sm shadow-purple-600 text-white px-2 py-1 rounded-full text-sm font-medium";
            case "discontinued":
                return "bg-gray-500/20 shadow-sm shadow-gray-500 text-white px-2 py-1 rounded-full text-sm font-medium";
            default:
                return "bg-gray-700/20  shadow-sm shadow-gray-700 text-white px-2 py-1 rounded-full text-sm font-medium";
        }
    };

    return (
        <div
            className="min-h-screen text-white p-8"
            style={{
                background:
                    "radial-gradient(circle at center, #1a1a1a 0%, #0f0f0f 100%)",
            }}
        >
            <Navbar />
            <h1 className="text-6xl font-bold mb-6 text-center my-4">
                🛍️ Seller Dashboard
            </h1>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Category Stock Distribution */}
                <div className="bg-gray-800 rounded-2xl shadow-lg p-4">
                    <h2 className="text-xl mb-4 font-semibold">📊 Stock by Category</h2>
                    <ResponsiveContainer width="100%" height={800}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="stock"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {categoryData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Price Distribution */}
                <div className="bg-gray-800 rounded-2xl shadow-lg p-4">
                    <h2 className="text-xl mb-4 font-semibold">💰 Product Price Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priceData}>
                            <XAxis dataKey="name" hide />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="price" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-gray-800 rounded-2xl shadow-lg overflow-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Description</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Brand</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Availability</th>
                            <th className="py-3 px-4">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: Product) => (
                            <tr
                                key={product._id}
                                className="border-b border-gray-700 hover:bg-gray-700 transition"
                            >
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4 max-w-xs truncate">
                                    {product.description}
                                </td>
                                <td className="py-2 px-4">₹{product.price}</td>
                                <td className="py-2 px-4">{product.brand}</td>
                                <td className="py-2 px-4">{product.category}</td>
                                <td className="py-2 px-4">
                                    <span className={getAvailabilityClasses(product.availability)}>
                                        {product.availability}
                                    </span>
                                </td>
                                <td className="py-2 px-4">{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerDashboard;

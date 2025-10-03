
import { useState, useMemo, useEffect } from "react";
import useProductStore from "../../store/useProductStore.ts";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"
import Navbar from "../../components/seller/Navbar.tsx"

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



const ProductLists = () => {

    const { products, setProducts } = useProductStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: "",
        description: "",
        price: 0,
        brand: "",
        category: "",
        availability: "",
        stock: 0,
    });
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        price: 0,
        brand: "",
        category: "",
        availability: "in stock",
        stock: 0,
    })

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/getAllProducts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    // 🔍 Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter(
            (p: Product) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const handleProductDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        })
    }

    // 🧭 Add New Product
    const handleAddProduct = async () => {
        setEditProduct({
            name: "",
            description: "",
            price: 0,
            brand: "",
            category: "",
            availability: "",
            stock: 0,
        });
        setIsModalOpen(true);


    };
    const handleAddProductSubmit = async () => {
        console.log("productDetails", productDetails)
        const addNewProduct = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/addproducts`, productDetails, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setProducts([...products, addNewProduct.data]);
        setEditProduct({
            name: "",
            description: "",
            price: 0,
            brand: "",
            category: "",
            availability: "",
            stock: 0,
        });
        setIsModalOpen(true);
    }


    // ✏️ Edit Product
    const handleEditProduct = (product: Product) => {
        setEditProduct(product);
        setIsModalOpen(true);
    };

    // 🗑️ Delete Product
    const handleDeleteProduct = async (productId: string) => {
        const updatedProducts = products.filter((p: Product) => p._id !== productId);
        const deleteProduct = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log("deleteProduct", deleteProduct)

        setProducts(updatedProducts);
        return (
            <Alert>
                <AlertTitle>Product Deleted Successfully</AlertTitle>
            </Alert>
        )
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
            {/* Header Section */}
            <div className="flex flex-col  my-10 sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">📦 Product List</h1>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search by name, category, brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-2 transition"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-gray-800 rounded-2xl shadow-lg overflow-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Brand</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Stock</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product: Product) => (
                                <tr
                                    key={product._id}
                                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                                >
                                    <td className="py-2 px-4">{product.name}</td>
                                    <td className="py-2 px-4">{product.category}</td>
                                    <td className="py-2 px-4">{product.brand}</td>
                                    <td className="py-2 px-4">₹{product.price}</td>
                                    <td className="py-2 px-4">{product.stock}</td>
                                    <td className="py-2 px-4 flex justify-center gap-3">
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="text-blue-400 hover:text-blue-500 transition"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="text-red-500 hover:text-red-600 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-6 text-gray-400 italic"
                                >
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md relative">
                        <h2 className="text-2xl mb-4 font-semibold">
                            {editProduct ? "✏️ Edit Product" : "➕ Add Product"}
                        </h2>
                        {/* Form Fields */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsModalOpen(false);
                            }}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleProductDetails}
                                defaultValue={editProduct ? editProduct.name : ""}
                                className="px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                name="category"
                                onChange={handleProductDetails}
                                defaultValue={editProduct ? editProduct.category : ""}
                                className="px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Brand"
                                name="brand"
                                onChange={handleProductDetails}
                                defaultValue={editProduct ? editProduct.brand : ""}
                                className="px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                name="price"
                                onChange={handleProductDetails}
                                defaultValue={editProduct ? editProduct.price : ""}
                                className="px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                name="stock"
                                onChange={handleProductDetails}
                                defaultValue={editProduct ? editProduct.stock : ""}
                                className="px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddProductSubmit}
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductLists;


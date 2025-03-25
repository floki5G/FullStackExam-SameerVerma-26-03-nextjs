'use client';

import Dialog from '@/common/dialog';
import { productApi, reportsApi } from '@/lib/api';
import { RevenueReport, SalesByCategory, TopSpender } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';


export default function ReportsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [revenueReport, setRevenueReport] = useState<RevenueReport[]>([]);
    const [topSpenders, setTopSpenders] = useState<TopSpender[]>([]);
    const [productSalesByCategory, setProductSalesByCategory] = useState<SalesByCategory[]>([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'electronics',
        description: '',
        imageUrl: '',
        stock: '',
        featured: 'false',
        ratings: '4',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };


    const fetchReports = useCallback(async () => {
        try {
            const [revenueRes, spendersRes, productSalesRes] = await Promise.all([
                reportsApi.getDailyRevenue(),
                reportsApi.getTopSpenders(),
                reportsApi.getSalesByCategory(),
            ]);

            setRevenueReport(revenueRes.data.data);
            setTopSpenders(spendersRes.data.data);
            setProductSalesByCategory(productSalesRes.data.data);
        } catch (error) {
            console.error('Failed to fetch reports', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);
    const onClose = () => {
        setIsOpen(false);
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await productApi.createProduct({
                ...newProduct,
                price: parseFloat(newProduct.price) || 0,
                stock: parseInt(newProduct.stock) || 0,
                ratings: parseFloat(newProduct.ratings) || 0,
                featured: newProduct.featured === 'true',
            });
            console.log('Product added:', response.data);
            onClose();
            setNewProduct({
                name: '',
                price: '',
                description: '',
                imageUrl: '',
                stock: '',
                featured: 'false',
                category: '',
                ratings: '',
            });
        } catch (error) {
            console.error('Failed to add product', error);
            toast.error((error as {
                response: {
                    data: {
                        message: string;
                    };
                };
            }

            ).response?.data.message || 'Failed to add product');
        }
    };



    return (
        <div className="container mx-auto px-4 py-8">

            <button
                onClick={() => setIsOpen(true)}
                className="mb-6 px-4 py-2 bg-white text-black rounded-md"
            >
                Add Product
            </button>

            <Dialog isOpen={isOpen} onClose={onClose} title="Add Product">
                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>
                        <label className="block text-sm font-medium ">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium ">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium ">Description</label>
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium ">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={newProduct.imageUrl}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <select
                            name="category"
                            value={newProduct.category}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                            {/* 'electronics', 'clothing', 'books', 'home', 'beauty', 'sports', 'other' */}
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            <option value="home">Home</option>
                            <option value="beauty">Beauty</option>
                            <option value="sports">Sports</option>
                            <option value="other">Other</option>

                        </select>

                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium ">Featured</label>
                        <select
                            name="featured"
                            value={newProduct.featured}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium ">Ratings</label>
                        <input
                            type="number"
                            name="ratings"
                            value={newProduct.ratings}
                            onChange={handleChange}
                            min="0"
                            max="5"
                            step="0.1"
                            className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="py-2 px-4 bg-black text-white rounded-md">
                            Add Product
                        </button>
                    </div>
                </form>
            </Dialog>

            {loading ? (
                <p className="text-center text-gray-500">Loading reports...</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Revenue Report */}
                    <div className=" border-2 border-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Daily Revenue</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left">Date</th>
                                    <th className="text-right">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueReport.map(({ date, revenue }) => (
                                    <tr key={date} className="border-b">
                                        <td>{date}</td>
                                        <td className="text-right">${revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Top Spenders Report */}
                    <div className=" border-2 border-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Top Spenders</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left">Username</th>
                                    <th className="text-right">Total Spent</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* email: string

id: string
name: string;
orderCount: number;
totalSpent: number; */}
                                {topSpenders.map(({
                                    email: username,
                                    id: userId,
                                    totalSpent

                                }) => (
                                    <tr key={userId} className="border-b">
                                        <td>{username}</td>
                                        <td className="text-right">${totalSpent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Product Sales Report */}
                    <div className=" border-2 border-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Product Sales</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left">Product</th>
                                    <th className="text-right">Total Sold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* averagePrice: string
    count: number
    totalStock: number
    _id: string */}
                                {productSalesByCategory.map(({ _id, averagePrice }) => (
                                    <tr key={_id} className="border-b">
                                        <td>{_id}</td>
                                        <td className="text-right">{averagePrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

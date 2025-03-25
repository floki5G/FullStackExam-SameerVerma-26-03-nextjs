'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types';
import { orderApi } from '@/lib/api';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderApi.getOrders();
                setOrders(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch orders', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading orders...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Order #{order.id}
                                </h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${order.status === 'completed'
                                        ? 'bg-green-100 text-green-800'
                                        : order.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Total: ${order.totalAmount}</p>
                            </div>

                            {/* <div>
                                <h3 className="font-medium mb-2">Order Items:</h3>
                                <ul className="space-y-2">
                                    {order.items.map((item) => (
                                        <li
                                            key={item._id}
                                            className="flex justify-between"
                                        >
                                            <span>{item.name}</span>
                                            <span>
                                                {item.quantity} x ${item.price.toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
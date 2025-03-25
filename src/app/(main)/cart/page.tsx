'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cartApi, orderApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { Cart } from '@/types';

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const router = useRouter();


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await cartApi.getCart();
                setCart(data.data);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to fetch cart');
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const handleRemoveFromCart = useCallback(async (productId: string) => {
        try {
            const { data } = await cartApi.removeFromCart(productId);
            setCart(data.data);
            toast.success('Product removed from cart');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to remove product');
        }
    }, []);

    const handleCreateOrder = async () => {
        if (!shippingAddress.trim()) {
            toast.error('Please enter a shipping address');
            return;
        }
        try {
            await orderApi.createOrder({ shippingAddress, paymentMethod });
            toast.success('Order created successfully');
            router.push('/orders');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create order');
        }
    };

    const handleClearCart = async () => {
        try {
            await cartApi.clearCart();
            setCart(null);
            toast.success('Cart cleared successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to clear cart');
        }
    };

    if (loading) return <p>Loading cart...</p>;
    if (!cart || cart.items.length === 0) return <div

        className='flex flex-col items-center justify-center h-full'
    >

        <p>        Your cart is empty</p>
        <button
            onClick={() => router.push('/')}
            className="bg-white text-black p-2 rounded"
        >
            Continue Shopping
        </button>

    </div>;

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                >
                    Clear Cart
                </button>
            </div>

            <div className="space-y-4">
                {cart.items.map(({ _id, name, price, quantity, productId }) => (
                    <div key={_id} className="flex justify-between items-center p-2 border rounded">
                        <span className="font-medium">{name}</span>
                        <span>${price.toFixed(2)} x {quantity}</span>
                        <button
                            onClick={() => handleRemoveFromCart(productId)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            < div className="mt-6 flex justify-between items-center" >
                <span className="font-medium">Total:</span>
                <span>${

                    cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
                }</span>
            </div>
            <div className="mt-6 space-y-3">
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Shipping address"
                    className="w-full p-2 border rounded"
                />

                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={`w-full p-2 border rounded ${paymentMethod === 'paypal' ? '' : 'bg-black'
                        }`}
                >
                    <option value="cod">Cash on Delivery</option>
                    <option value="paypal">PayPal</option>
                </select>

                <button
                    onClick={handleCreateOrder}
                    className="w-full bg-green-500 text-white p-2 rounded"
                >
                    Create Order
                </button>
            </div>
        </div>
    );
}

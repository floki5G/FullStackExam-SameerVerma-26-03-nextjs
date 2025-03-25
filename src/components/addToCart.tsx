'use client';
import { useCart } from "@/hooks/useCart";
import { Cart, Product } from "@/types";
import { useState } from "react";

export const AddToCart = ({ product, cartData }: {
    product: Product,
    cartData: Cart
}) => {
    const [cart, setCart] = useState<Cart | null>(cartData || null);
    const { removeFromCart, addToCart, updateCart } = useCart(
        product._id,
        1,
        setCart
    );

    if (!cart) return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
    );

    const cartItem = cart.items?.find((item) => item?.productId === product._id);

    return (
        <div className="flex items-center space-x-2">
            {cartItem ? (
                <div className="flex items-center space-x-2">
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                            onClick={() => updateCart((cartItem.quantity || 0) - 1)}
                            disabled={cartItem.quantity === 1}
                            className=" px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            -
                        </button>
                        <span className="px-4 py-2 text-center min-w-[40px]">
                            {cartItem.quantity}
                        </span>
                        <button
                            onClick={() => updateCart((cartItem.quantity || 0) + 1)}
                            className=" px-3 py-2"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => removeFromCart()}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Remove</span>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => addToCart()}
                    disabled={product.stock === 0}
                    className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>
            )}
        </div>
    );
}
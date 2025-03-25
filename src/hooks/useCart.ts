import { cartApi } from '@/lib/api';
import { Cart } from '@/types';
export const useCart = (
    productId: string,
    quantity: number = 1,
    setCart: (cart: Cart | null) => void
) => {

    const getCart = async () => {
        try {
            const response = await cartApi.getCart();
            setCart(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }
    const addToCart = async () => {
        try {
            const resposne = await cartApi.addToCart(productId, quantity);
            setCart(resposne.data.data);
            return resposne.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromCart = async () => {
        try {
            const response = await cartApi.removeFromCart(productId);
            setCart(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }
    const clearCart = async () => {
        try {
            await cartApi.clearCart();
            setCart(null);
        } catch (error) {
            console.error(error);
        }
    }

    const updateCart = async (quantity: number) => {
        try {
            const response = await cartApi.updateCart(productId, quantity);
            setCart(response.data.data);
            return response.data.data
        } catch (error) {
            console.error(error);
        }
    }


    return { addToCart, removeFromCart, clearCart, updateCart, getCart };
}
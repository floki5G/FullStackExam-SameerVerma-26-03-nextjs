import { AxiosResponse } from 'axios';
import {
    User,
    Product,
    Order,
    RegisterData,
    LoginCredentials,
    Cart,
    Pagination,
    RevenueReport,
    TopSpender,
    SalesByCategory,
} from '../types';
import api from '@/services/api';


class ApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

export const authApi = {
    register: (data: RegisterData): Promise<AxiosResponse<{
        success: boolean;
        data: { user: User; token: string }
    }>> =>
        api.post('/auth/register', data),

    login: (credentials: LoginCredentials): Promise<AxiosResponse<{
        success: boolean;
        data: { user: User; token: string }
    }>> =>
        api.post('/auth/login', credentials),

    logout: (): Promise<AxiosResponse> =>
        api.post('/auth/logout'),

    getCurrentUser: (): Promise<AxiosResponse<{
        success: boolean;
        data: User
    }>> =>
        api.get('/auth/me'),
};

export const productApi = {
    getProducts: (params?: Record<string, unknown>): Promise<AxiosResponse<{
        success: boolean;
        data: Product[];
        pagination: Pagination
    }>> =>
        api.get('/products', { params }),

    searchProducts: (query: string): Promise<AxiosResponse<{
        success: boolean;
        data: Product[];
        pagination: Pagination
    }>> =>
        api.get('/products/search', { params: { query } }),

    getProductById: (id: string): Promise<AxiosResponse<{ data: Product }>> =>
        api.get(`/products/${id}`),

    createProduct: (productData: Partial<Product>): Promise<AxiosResponse<{ data: Product }>> =>
        api.post('/products', productData),

    updateProduct: (id: string, productData: Partial<Product>): Promise<AxiosResponse<{ data: Product }>> =>
        api.put(`/products/${id}`, productData),

    deleteProduct: (id: string): Promise<AxiosResponse> =>
        api.delete(`/products/${id}`),
};

export const cartApi = {
    getCart: (): Promise<AxiosResponse<{ data: Cart }>> =>
        api.get('/cart'),

    addToCart: (productId: string, quantity = 1): Promise<AxiosResponse<{ data: Cart }>> =>
        api.post('/cart', { productId, quantity }),

    removeFromCart: (productId: string): Promise<AxiosResponse<{ data: Cart }>> =>
        api.delete(`/cart/${productId}`),

    clearCart: (): Promise<AxiosResponse> =>
        api.delete('/cart'),
    updateCart: (productId: string, quantity: number): Promise<AxiosResponse<{ data: Cart }>> =>
        api.put(`/cart/${productId}`, { quantity }),

};

export const orderApi = {
    createOrder: (orderData: {
        shippingAddress: string;
        paymentMethod: string;
    }): Promise<AxiosResponse<Order>> =>
        api.post('/orders', orderData),

    getOrders: (): Promise<AxiosResponse<{ data: Order[] }>> =>
        api.get('/orders'),

    getOrderById: (id: string): Promise<AxiosResponse<{ data: Order[] }>> =>
        api.get(`/orders/${id}`),

    updateOrderStatus: (id: string, status: Order['status']): Promise<AxiosResponse<{ data: Order[] }>> =>
        api.put(`/orders/${id}/status`, { status }),
};


// router.get('/daily-revenue', getDailyRevenue);
// router.get('/top-spenders', getTopSpenders);
// router.get('/sales-by-category', getSalesByCategory);
// router.get('/monthly-sales', getMonthlySales);
export const reportsApi = {

    getDailyRevenue: (): Promise<AxiosResponse<{ data: RevenueReport[] }>> =>
        api.get('/reports/daily-revenue'),
    getTopSpenders: (): Promise<AxiosResponse<{ data: TopSpender[] }>> =>
        api.get('/reports/top-spenders'),
    getSalesByCategory: (): Promise<AxiosResponse<{ data: SalesByCategory[] }>> =>
        api.get('/reports/sales-by-category'),
    getMonthlySales: (): Promise<AxiosResponse<{ data: RevenueReport[] }>> =>
        api.get('/reports/monthly-sales'),

};

export { ApiError };
export default api;
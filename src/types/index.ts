export interface Pagination {
    total: number;
    page: number;
    pages: number;
};

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    featured: boolean;
    ratings: number;
    numReviews: number;
}

export interface CartItem {

    // "productId": "67e268c16d051ef64c397090",
    // "name": "sameer kumar verma",
    // "price": 12,
    // "quantity": 1,
    // "imageUrl": "",
    // "_id": "67e2747d743642e96222c152"
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    _id: string;


}

export interface Order {
    createdAt: string
    id: number
    paymentMethod: string
    paymentStatus: string
    shippingAddress: string
    status: string
    totalAmount: number
}

export interface RevenueReport {
    date: string;
    revenue: number;
}

export interface ProductSales {
    productId: string;
    name: string;
    quantitySold: number;
}

export interface TopSpender {
    email: string

    id: string
    name: string;
    orderCount: number;
    totalSpent: number;
}
export interface SalesByCategory {
    averagePrice: string
    count: number
    totalStock: number
    _id: string
}

export interface Cart {
    items: CartItem[];


    _id: string;
    userId: string

}



export interface Cart {
    items: CartItem[];
    total: number;
}
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: string;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
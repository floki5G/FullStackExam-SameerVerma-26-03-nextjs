
import api from '@/services/api';
import { Product } from '@/types';
import Link from 'next/link';

export default async function ProductsPage() {

    const { data } = await api.get(`/api/products`);

    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((product: Product) => (
                    <div key={product._id} className="border p-4 rounded">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p>${product.price}</p>
                        <Link href={`/products/${product._id}`} className="text-blue-500">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
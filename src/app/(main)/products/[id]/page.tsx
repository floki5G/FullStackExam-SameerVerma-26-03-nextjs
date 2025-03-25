import { AddToCart } from "@/components/addToCart";
import { cartApi, productApi } from "@/lib/api";
import Image from "next/image";

export default async function Product({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const { data } = await productApi.getProductById(id);

    if (!data) {
        return <div className="text-center py-8">Loading product details...</div>;
    }

    const product = data.data;
    const { data: cartData } = await cartApi.getCart();

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-gray-100 rounded-lg p-8 aspect-square">
                    {product.imageUrl && <Image
                        src={product.imageUrl || "/placeholder-product.jpg"}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        {product.featured && (
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                Featured Product
                            </span>
                        )}
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < product.ratings ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm">
                                ({product.numReviews} reviews)
                            </span>
                        </div>
                    </div>

                    <p className=" text-lg">{product.description}</p>

                    <div className="space-y-4">
                        <div className="text-3xl font-bold ">
                            ${product.price}
                        </div>

                        <div className="flex items-center space-x-2">
                            <span
                                className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                            {product.stock > 0 && (
                                <span className="text-gray-500 text-sm">
                                    ({product.stock} available)
                                </span>
                            )}
                        </div>
                        {/* Product Specifications */}
                        <div >
                            <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="">Category</span>
                                    <span className="">{product.category}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <AddToCart product={product} cartData={cartData.data} />
                </div>
            </div>


        </div>
    );
}
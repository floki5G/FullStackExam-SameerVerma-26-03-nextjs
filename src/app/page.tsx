import { Pagination } from '@/components/pagination';
import { ProductSearch } from '@/components/productSearch';
import { productApi } from '@/lib/api';
import { Product } from '@/types';
import Link from 'next/link';

export default async function Home({ searchParams }: {
  searchParams?:
  Promise<{ page?: string; q?: string }>;
}) {
  if (!searchParams) return <div>Loading...</div>
  const query = await searchParams;
  const q = query?.q ? query?.q : '';
  const { data } =
    q ? await productApi.searchProducts(q) :
      await productApi.getProducts(
        { page: query.page ? parseInt(query.page) : 1 }
      );


  if (!data) return <div>Loading...</div>
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 ">Our Products</h1>
      <ProductSearch />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {data.data?.map((product: Product) => (
          <div
            key={product._id}
            className="border-2 border-white rounded-lg shadow-lg overflow-hidden transform transition-all"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold  truncate">{product.name}</h2>
                {product.featured && (
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm line-clamp-2">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm  mb-4">
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="truncate">{product.category}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium">Price:</span>
                  <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center text-sm border-t pt-4">
                <div>
                  <span className="block font-medium">Reviews</span>
                  {product.numReviews}
                </div>
                <div>
                  <span className="block font-medium">Ratings</span>
                  {product.ratings}
                </div>
                <div>
                  <span className="block font-medium">In Stock</span>
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Link
                  href={`/products/${product._id}`}
                  className="flex-1 bg-white text-black py-2 rounded-md text-center transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {!data.data.length && <div className="text-center">No products found</div>}

      </div>
      {

        !query?.q &&
        <Pagination
          currentPage={data.pagination.page}
          totalPages={data.pagination.pages}
        />}
    </div>
  );
}
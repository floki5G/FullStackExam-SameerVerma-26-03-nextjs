'use client'

import Link from "next/link";
import { useState } from "react";

export const ProductSearch = () => {
    const [search, setSearch] = useState('');
    return (
        <div className="flex justify-center space-x-4">
            <input
                type="text"
                placeholder="Search products"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
            >
            </input>
            {
                search && (
                    <Link
                        href="/"
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
                    >
                        Clear
                    </Link>
                )
            }
            <Link
                href={`/?q=${search}`}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
            >
                Search
            </Link>

        </div>
    );
}
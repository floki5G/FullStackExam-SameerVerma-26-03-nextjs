'use client';

import Link from "next/link";

export const Pagination = ({ currentPage, totalPages }: {
    currentPage: number;
    totalPages: number;
}) => {
    return (
        <div className="flex justify-center space-x-4">
            {

                currentPage > 1 && (
                    <Link
                        href={`/?page=${currentPage - 1}`} // Add query parameter
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
                    >
                        Previous
                    </Link>
                )
            }
            <span>
                Page {currentPage} of {totalPages}
            </span>
            {
                currentPage < totalPages && (
                    <Link
                        href={`/?page=${currentPage + 1}`} // Add query parameter
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
                    >
                        Next
                    </Link>
                )
            }

        </div>
    );
}
'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">E-Commerce</Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            <Link href="/cart" className="text-white">Cart</Link>
                            <button onClick={logout} className="text-white">Logout</button>
                            {user.role === 'admin' && (
                                <Link href="/admin/reports" className="text-white">Reports</Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-white">Login</Link>
                            <Link href="/register" className="text-white">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
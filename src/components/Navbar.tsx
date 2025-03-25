'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <nav className="bg-white text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className=" text-xl font-bold">E-Commerce</Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            <Link href="/cart" className="">Cart</Link>
                            <button onClick={logout} className="">Logout</button>
                            {user.role === 'admin' && (
                                <Link href="/admin/reports" className="">Reports</Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="">Login</Link>
                            <Link href="/register" className="">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
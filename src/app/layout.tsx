
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import getAccessToken from '@/utils/getToken';
import { authApi } from '@/lib/api';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend E-commerce',
  description: 'Frontend E-commerce',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();
  let user = null;
  if (token) {
    const { data } = await authApi.getCurrentUser();
    user = data.data
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider user={user}>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </AuthProvider>
        <Toaster />

      </body>
    </html>
  );
}
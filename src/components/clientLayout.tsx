'use client';
export const ClientLayout = ({ children }:

    {
        children: React.ReactNode
    }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                {children}
            </div>
        </div>
    );
}
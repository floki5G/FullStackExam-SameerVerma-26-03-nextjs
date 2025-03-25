import { useEffect } from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    type?: string;
}

const Dialog = ({ isOpen, onClose, title, children, type }: DialogProps) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black opacity-30"
                onClick={onClose}
            ></div>

            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className={`relative ${type !== 'auto' ? 'w-full max-w-2xl' : ''} p-6 mx-auto bg-white rounded-lg`}
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing dialog
                >
                    {title && <h3 className="pb-5 mb-2 text-lg text-black font-semibold border-b border-gray-400">{title}</h3>}

                    <div className="p-2 max-h-[90vh] overflow-y-auto">

                        {children}
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute text-gray-500 top-4 right-4 b-2 hover:text-gray-700"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
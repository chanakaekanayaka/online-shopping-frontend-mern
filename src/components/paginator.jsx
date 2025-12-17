import React from 'react';

export default function Paginator(props) {
    // 1. Destructure props (Removed setLoading as it is not needed here anymore)
    const { currentPage, totalPages, setCurrentPage, limit, LIMIT, setLimit } = props;

    // 2. Handle limit prop mismatch
    const pageSize = limit || LIMIT || 10;
    
    // 3. Safety check for totalPages
    const safeTotalPages = totalPages > 0 ? totalPages : 1;

    return (
        <div className="w-full flex flex-row justify-end items-center gap-4 text-gray-600">
            
            {/* Limit Selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rows:</span>
                <select 
                    className="h-[32px] border border-gray-300 rounded px-2 bg-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                    value={pageSize}
                    onChange={(e) => {
                        setLimit(parseInt(e.target.value));
                        setCurrentPage(1); // Reset to page 1
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
                <button 
                    className={`px-3 py-1 border rounded text-sm font-medium transition-colors ${
                        currentPage <= 1 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>

                <div className="text-sm font-medium">
                    Page {currentPage} of {safeTotalPages}
                </div>

                <button 
                    className={`px-3 py-1 border rounded text-sm font-medium transition-colors ${
                        currentPage >= safeTotalPages 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-blue-600 text-white hover:bg-blue-700 border-transparent"
                    }`}
                    disabled={currentPage >= safeTotalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
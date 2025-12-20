import React from 'react';

export default function Paginator(props) {
    // Destructure props
    const { currentPage, totalPages, setCurrentPage, limit, LIMIT, setLimit } = props;

    // Handle limit prop mismatch
    const pageSize = limit || LIMIT || 10;
    
    // Safety check for totalPages
    const safeTotalPages = totalPages > 0 ? totalPages : 1;

    return (
        <div className="w-full flex flex-row justify-end items-center gap-6 text-slate-600">
            
            {/* Limit Selector */}
            <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Rows per page:</span>
                <select 
                    className="h-[36px] border border-slate-200 rounded-xl px-3 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
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

            {/* Pagination Controls */}
            <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-slate-500">
                    Page <span className="text-slate-900 font-bold">{currentPage}</span> of <span className="text-slate-900 font-bold">{safeTotalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        className={`px-4 py-1.5 border rounded-xl text-sm font-bold transition-all ${
                            currentPage <= 1 
                            ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed" 
                            : "bg-white border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 shadow-sm"
                        }`}
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    <button 
                        className={`px-4 py-1.5 border rounded-xl text-sm font-bold transition-all shadow-lg ${
                            currentPage >= safeTotalPages 
                            ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed shadow-none" 
                            : "bg-blue-600 text-white border-transparent hover:bg-blue-700 shadow-blue-100"
                        }`}
                        disabled={currentPage >= safeTotalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
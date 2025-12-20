import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersPageAdmin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    
    // Modal State
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchOrders();
    }, [page, limit]);

    const fetchOrders = () => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/" + page + "/" + limit, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages || res.data.totalpages || 0);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    };

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        setStatus(order.status);
        setNotes(order.notes || ""); 
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setStatus("");
        setNotes("");
    };

    const handleSaveOrder = () => {
        if (!selectedOrder) return;

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/orders/" + selectedOrder.orderID, 
            {
                status: status,
                notes: notes
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
        .then((res) => {
            toast.success("Order updated successfully!");
            closeModal();
            fetchOrders(); 
        })
        .catch((err) => {
            console.error("Error updating order:", err);
            toast.error("Failed to update order.");
        });
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-slate-50 p-6 relative">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
                <p className="text-slate-500 text-sm">Review transactions and update fulfillment status</p>
            </div>

            <div className="flex-grow bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col overflow-hidden">
                <div className="overflow-x-auto flex-grow">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer Info</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            Loading orders...
                                        </div>
                                    </td>
                                </tr>
                            ) : orders && orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr 
                                        key={index} 
                                        className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                                        onClick={() => handleRowClick(order)}
                                    >
                                        <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">
                                            #{order.orderID || order._id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-900 font-semibold">{order.name}</div>
                                            <div className="text-slate-400 text-xs">{order.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                                            LKR {order.total ? order.total.toLocaleString('en-US', { minimumFractionDigits: 2 }) : "0.00"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                        No orders found in the system.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                    <Paginator
                        currentPage={page}
                        totalPages={totalPages}
                        setCurrentPage={setPage}
                        LIMIT={limit}
                        setLimit={setLimit}
                    />
                </div>
            </div>

            {/* --- ORDER DETAILS MODAL --- */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Order Overview</h2>
                                <p className="text-xs text-slate-400 mt-1">ID: {selectedOrder.orderID}</p>
                            </div>
                            <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">&times;</button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Customer Details</label>
                                    <div className="mt-2 text-slate-900 font-bold">{selectedOrder.name}</div>
                                    <div className="text-slate-500 text-sm">{selectedOrder.phone}</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Shipping Address</label>
                                    <div className="mt-2 text-slate-500 text-sm leading-relaxed">{selectedOrder.address}</div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-800 mb-3 ml-1">Purchased Items</h3>
                                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                                    <table className="w-full text-xs">
                                        <thead className="bg-slate-50 text-slate-500">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Item Name</th>
                                                <th className="px-4 py-3 text-center">Qty</th>
                                                <th className="px-4 py-3 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {selectedOrder.items.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="px-4 py-3 text-slate-700 font-medium">{item.name}</td>
                                                    <td className="px-4 py-3 text-center text-slate-500">{item.qty}</td>
                                                    <td className="px-4 py-3 text-right text-slate-900 font-bold">
                                                        {(item.price * item.qty).toLocaleString('en-US', {minimumFractionDigits: 2})}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-blue-50/50">
                                            <tr>
                                                <td colSpan="2" className="px-4 py-3 text-right font-bold text-blue-600">Grand Total:</td>
                                                <td className="px-4 py-3 text-right font-bold text-blue-600">
                                                    LKR {selectedOrder.total.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Fulfillment Status</label>
                                    <select 
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Internal Admin Notes</label>
                                    <textarea 
                                        value={notes} 
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm h-24 resize-none focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                                        placeholder="Add private notes here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
                            <button onClick={closeModal} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Discard</button>
                            <button onClick={handleSaveOrder} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">Update Order</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
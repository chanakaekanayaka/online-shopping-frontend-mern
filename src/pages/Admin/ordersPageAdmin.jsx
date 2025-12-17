import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";

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

        console.log("Updating Order:", selectedOrder.orderID, "Status:", status);

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
            console.log("Update Success:", res.data);
            alert("Order updated successfully!");
            closeModal();
            fetchOrders(); // Refresh table data
        })
        .catch((err) => {
            console.error("Error updating order:", err);
            alert("Failed to update order. Check console for details.");
        });
    };

    return (
        <div className="w-full h-full flex flex-col bg-gray-50 p-6 relative">
            <div className="flex-grow overflow-hidden bg-white shadow-md rounded-lg flex flex-col">
                <div className="overflow-x-auto flex-grow">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 whitespace-nowrap">Order ID</th>
                                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                                <th className="px-6 py-3 whitespace-nowrap">Date</th>
                                <th className="px-6 py-3 whitespace-nowrap text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders && orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr 
                                        key={index} 
                                        className="bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleRowClick(order)}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {order.orderID || order._id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900">
                                            {order.total ? order.total.toLocaleString('en-US', { minimumFractionDigits: 2 }) : "0.00"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                Order Details: {selectedOrder.orderID}
                            </h2>
                            <button 
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            
                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Customer Name</label>
                                    <div className="mt-1 text-gray-900">{selectedOrder.name}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                                    <div className="mt-1 text-gray-900">{selectedOrder.phone}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Address</label>
                                    <div className="mt-1 text-gray-900">{selectedOrder.address}</div>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Ordered Items</h3>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2">Product</th>
                                                <th className="px-4 py-2 text-right">Price</th>
                                                <th className="px-4 py-2 text-center">Qty</th>
                                                <th className="px-4 py-2 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {selectedOrder.items.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="px-4 py-2">{item.name}</td>
                                                    <td className="px-4 py-2 text-right">{item.price}</td>
                                                    <td className="px-4 py-2 text-center">{item.qty}</td>
                                                    <td className="px-4 py-2 text-right">
                                                        {(item.price * item.qty).toLocaleString('en-US', {minimumFractionDigits: 2})}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50 font-bold text-gray-900">
                                            <tr>
                                                <td colSpan="3" className="px-4 py-3 text-right">Total Amount:</td>
                                                <td className="px-4 py-3 text-right">
                                                    {selectedOrder.total.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Update Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                                    <select 
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                                    <textarea 
                                        value={notes} 
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border h-24"
                                        placeholder="Add notes about this order..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                            <button 
                                onClick={closeModal}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveOrder}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdmin() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
        setProduct(res.data);
        setisLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Product Management</h1>
        <p className="text-slate-500 text-sm">Hi Admin</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Loader />
        </div>
      ) : (
        <div className="w-full overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-4 text-sm font-semibold text-slate-700">Product ID</th>
                <th className="p-4 text-sm font-semibold text-slate-700">Name</th>
                <th className="p-4 text-sm font-semibold text-slate-700 text-center">Image</th>
                <th className="p-4 text-sm font-semibold text-slate-700">Price (LKR)</th>
                <th className="p-4 text-sm font-semibold text-slate-700">Stock</th>
                <th className="p-4 text-sm font-semibold text-slate-700">Category</th>
                <th className="p-4 text-sm font-semibold text-slate-700 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {product.map((product, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm text-slate-600 font-medium">{product.productID}</td>
                  <td className="p-4 text-sm text-slate-800 font-semibold">{product.productName}</td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <img
                        src={product.image[0]}
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 shadow-sm"
                        alt="product"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-blue-600">
                    {product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs uppercase font-bold tracking-wider">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          if (token == null) {
                            navigate("/login");
                            return;
                          }
                          axios
                            .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productID, {
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((res) => {
                              toast.success("Product deleted successfully");
                              setisLoading(true);
                            })
                            .catch((error) => {
                              toast.error("Failed to delete product");
                            });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Product"
                      >
                        <BiTrash size={22} />
                      </button>

                      <button
                        onClick={() => navigate("/admin/updateProduct", { state: product })}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        title="Edit Product"
                      >
                        <BiEdit size={22} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Action Button */}
      <Link
        to={"/admin/addNewProduct"}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all hover:scale-110 active:scale-95 z-50"
      >
        <BiPlus size={32} />
      </Link>
    </div>
  );
}
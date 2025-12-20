import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { GiBoxUnpacking } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import ProductsAdmin from "./Admin/productsAdmin";
import AddnewProductAdminPage from "./Admin/newProductAdminPage";
import UpdateProduct from "./Admin/updateProduct";
import OrdersPageAdmin from "./Admin/ordersPageAdmin";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import axios from "axios";

export default function Admin() {
  const navigate = useNavigate();
  const [adminValidated, setAdminValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Your are not login ");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((Response) => {
          if (Response.data.role == "admin") {
            setAdminValidated(true);
          } else {
            toast.error("You are not authorized");
            navigate("/login");
          }
        })
        .catch(() => {
          toast.error("You are not authorized");
          navigate("/login");
        });
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-sans">
      {adminValidated ? (
        <>
          {/* Sidebar */}
          <div className="min-h-screen w-[300px] bg-white border-r border-slate-200 flex flex-col items-center shadow-sm">
            <div className="py-10">
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                Admin <span className="text-blue-600">Panel</span>
              </span>
            </div>

            <nav className="w-full px-4 space-y-2">
              <Link
                className="flex flex-row items-center w-full h-[50px] px-6 text-lg font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all gap-4"
                to="/admin/products"
              >
                <FaBox className="text-xl" /> Products
              </Link>
              <Link
                className="flex flex-row items-center w-full h-[50px] px-6 text-lg font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all gap-4"
                to="/admin/orders"
              >
                <GiBoxUnpacking className="text-xl" /> Orders
              </Link>
              <Link
                className="flex flex-row items-center w-full h-[50px] px-6 text-lg font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all gap-4"
                to="/admin/users"
              >
                <FaUserCog className="text-xl" /> Users
              </Link>
              <Link
                className="flex flex-row items-center w-full h-[50px] px-6 text-lg font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all gap-4"
                to="/admin/settings"
              >
                <IoSettingsSharp className="text-xl" /> Settings
              </Link>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow bg-slate-50 p-8 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[calc(100vh-64px)] p-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col items-center justify-center h-full py-20">
                      <h1 className="text-3xl font-bold text-slate-800">
                        Welcome, Administrator
                      </h1>
                      <p className="text-slate-500 mt-2">
                        Select a category from the sidebar to manage your store.
                      </p>
                    </div>
                  }
                />
                <Route path="/products" element={<ProductsAdmin />} />
                <Route
                  path="/addNewProduct"
                  element={<AddnewProductAdminPage />}
                />
                <Route path="/updateProduct" element={<UpdateProduct />} />
                <Route path="/orders" element={<OrdersPageAdmin />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
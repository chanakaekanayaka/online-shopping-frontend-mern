import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import uploadfile from '../../utils/mediaUpload';

export default function AddnewProductAdminPage() {

    const [productID, setproductID] = useState("");
    const [productName, setproductName] = useState("");
    const [altNames, setaltNames] = useState("");
    const [labelledPrice, setlabelledPrice] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState([]);
    const [description, setdescription] = useState("");
    const [stock, setstock] = useState("");
    const [isAvailable, setisAvailable] = useState("true"); // Set a default value
    const [category, setcategory] = useState("");
    const navigate = useNavigate();

    async function addProduct() {
        const AltnameInarry = altNames.split(",")
        const promiseArray = []

        for (let i = 0; i < image.length; i++) {
            const promise = uploadfile(image[i])
            promiseArray[i] = promise
        }

        const responses = await Promise.all(promiseArray)

        const productData = {
            productID: productID,
            productName: productName,
            altNames: AltnameInarry,
            labelledPrice: labelledPrice,
            price: price,
            image: responses,
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            category: category
        }

        const token = localStorage.getItem("token")
        if (token == null) {
            window.location.href = "/login";
            return
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", productData,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(
            (response) => {
                toast.success("Product added successfully..")
                navigate("/admin/products")
            }
        ).catch(
            (error) => {
                toast.error("Product added unsuccessfully..")
            }
        )
    }

    return (
        <div className='w-full min-h-full bg-slate-50 flex justify-center items-center py-10'>
            <div className='w-full max-w-[700px] bg-white shadow-sm border border-slate-200 rounded-3xl flex flex-wrap justify-between p-8'>
                
                <div className='w-full mb-6'>
                    <h2 className='text-2xl font-bold text-slate-800'>Add New Product</h2>
                    <p className='text-slate-500 text-sm'>Fill in the details below to list a new item in your store.</p>
                </div>

                {/* Product ID */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Product ID</label>
                    <input type='text' placeholder='e.g. PRD-001' 
                        onChange={(e) => setproductID(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Product Name */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Product Name</label>
                    <input type='text' placeholder='Enter Product Name' 
                        onChange={(e) => setproductName(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Alternative Names */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Alternative Names (Comma separated)</label>
                    <input type='text' placeholder='tag1, tag2' value={altNames} 
                        onChange={(e) => setaltNames(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Labelled Price */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Labelled Price (LKR)</label>
                    <input type='number' placeholder='0.00' value={labelledPrice} 
                        onChange={(e) => setlabelledPrice(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Price */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Selling Price (LKR)</label>
                    <input type='number' placeholder='0.00' value={price} 
                        onChange={(e) => setprice(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Stock */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Stock Quantity</label>
                    <input type='number' placeholder='0' value={stock} 
                        onChange={(e) => setstock(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Availability */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Available</label>
                    <select 
                        onChange={(e) => setisAvailable(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer'>
                        <option value="true">Yes, In Stock</option>
                        <option value="false">No, Out of Stock</option>
                    </select>
                </div>

                {/* Category */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Category</label>
                    <input type='text' placeholder='e.g. Electronics' 
                        onChange={(e) => setcategory(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Image Upload */}
                <div className='w-full flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Product Images</label>
                    <input multiple type="file"  
                        onChange={(e) => setimage(e.target.files)}
                        className='border border-slate-200 border-dashed rounded-xl px-4 py-8 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-slate-500'/>
                </div>

                {/* Description */}
                <div className='w-full flex flex-col gap-1.5 mb-6'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Description</label>
                    <textarea rows='3' placeholder='Briefly describe the product features...' 
                        onChange={(e) => setdescription(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none'></textarea>
                </div>

                {/* Buttons */}
                <div className='w-full flex justify-end gap-3 mt-2 border-t border-slate-100 pt-6'>
                    <Link to="/admin/products" className='bg-slate-100 text-slate-600 px-8 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-colors'>
                        Cancel
                    </Link>
                    <button onClick={addProduct} className='bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95'>
                        Add Product
                    </button>
                </div>

            </div>
        </div>
    )
}
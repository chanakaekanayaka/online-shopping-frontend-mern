import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadfile from '../../utils/mediaUpload';

export default function UpdateProduct() {

    const location = useLocation();
    const navigate = useNavigate();

    const [productID, setproductID] = useState(location.state.productID);
    const [productName, setproductName] = useState(location.state.productName);
    const [altNames, setaltNames] = useState(location.state.altNames.join(","));
    const [labelledPrice, setlabelledPrice] = useState(location.state.labelledPrice);
    const [price, setprice] = useState(location.state.price);
    const [image, setimage] = useState([]);
    const [description, setdescription] = useState(location.state.description);
    const [stock, setstock] = useState(location.state.stock);
    const [isAvailable, setisAvailable] = useState(location.state.isAvailable);
    const [category, setcategory] = useState(location.state.category);

    async function handleUpdateProduct() {
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

        // If no new images selected, keep existing ones
        if (responses.length === 0) {
            productData.image = location.state.image;
        }

        const token = localStorage.getItem("token")
        if (token == null) {
            window.location.href = "/login";
            return
        }

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID, productData,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then(
            (response) => {
                toast.success("Product Updated successfully!")
                navigate("/admin/products")
            }
        ).catch(
            (error) => {
                toast.error("Product Update failed.")
            }
        )
    }

    return (
        <div className='w-full min-h-full bg-slate-50 flex justify-center items-center py-10'>
            <div className='w-full max-w-[700px] bg-white shadow-sm border border-slate-200 rounded-3xl flex flex-wrap justify-between p-8'>
                
                <div className='w-full mb-6'>
                    <h2 className='text-2xl font-bold text-slate-800'>Update Product</h2>
                    <p className='text-slate-500 text-sm'>Modifying details for Product ID: <span className='font-mono font-bold text-blue-600'>{productID}</span></p>
                </div>

                {/* Product ID (Disabled) */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4 opacity-70'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Product ID</label>
                    <input type='text' disabled value={productID}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-100 cursor-not-allowed'/>
                </div>

                {/* Product Name */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Product Name</label>
                    <input type='text' value={productName}
                        onChange={(e) => setproductName(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Alternative Names */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Alt Names (Comma separated)</label>
                    <input type='text' value={altNames}
                        onChange={(e) => setaltNames(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Labelled Price */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Labelled Price (LKR)</label>
                    <input type='number' value={labelledPrice}
                        onChange={(e) => setlabelledPrice(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Price */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Selling Price (LKR)</label>
                    <input type='number' value={price}
                        onChange={(e) => setprice(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-blue-600'/>
                </div>

                {/* Stock */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Stock Quantity</label>
                    <input type='number' value={stock}
                        onChange={(e) => setstock(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Availability */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Available</label>
                    <select value={isAvailable}
                        onChange={(e) => setisAvailable(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer'>
                        <option value="true">Yes, In Stock</option>
                        <option value="false">No, Out of Stock</option>
                    </select>
                </div>

                {/* Category */}
                <div className='w-[48%] flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Category</label>
                    <input type='text' value={category}
                        onChange={(e) => setcategory(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'/>
                </div>

                {/* Image Upload */}
                <div className='w-full flex flex-col gap-1.5 mb-4'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Update Images (Leave empty to keep existing)</label>
                    <input multiple type="file"  
                        onChange={(e) => setimage(e.target.files)}
                        className='border border-slate-200 border-dashed rounded-xl px-4 py-6 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-slate-500'/>
                </div>

                {/* Description */}
                <div className='w-full flex flex-col gap-1.5 mb-6'>
                    <label className='text-sm font-semibold text-slate-700 ml-1'>Description</label>
                    <textarea rows='3' value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        className='border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none'></textarea>
                </div>

                {/* Buttons */}
                <div className='w-full flex justify-end gap-3 mt-2 border-t border-slate-100 pt-6'>
                    <Link to="/admin/products" className='bg-slate-100 text-slate-600 px-8 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-colors'>
                        Cancel
                    </Link>
                    <button onClick={handleUpdateProduct} className='bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95'>
                        Update Product
                    </button>
                </div>

            </div>
        </div>
    )
}
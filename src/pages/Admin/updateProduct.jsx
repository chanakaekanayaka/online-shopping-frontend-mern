import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadfile from '../../utils/mediaUpload';

export default function UpdateProduct(){ 

const location = useLocation();

console.log(location)
   
const [productID,setproductID] = useState(location.state.productID);
const [productName,setproductName] = useState(location.state.productName);
const [altNames,setaltNames] = useState(location.state.altNames.join(","));
const [labelledPrice,setlabelledPrice] = useState(location.state.labelledPrice);
const [price,setprice] = useState(location.state.price);
const [image ,setimage ] = useState([]);   
const [description ,setdescription ] = useState(location.state.description);
const [stock,setstock] = useState(location.state.stock);
const [isAvailable,setisAvailable] = useState(location.state.isAvailable);
const [category ,setcategory] = useState(location.state.category);
const navigate = useNavigate(location.state.navigate);


    


async function addProduct(){

    const AltnameInarry = altNames.split(",")

    const promiseArray = []

    for(let i=0; i<image.length ; i++){

        const promise = uploadfile(image[i])
        promiseArray[i] = promise
    } 

    const responses = await Promise.all(promiseArray)
    console.log(responses)
    
    const productData = {


        productID : productID,
        productName : productName,
        altNames : AltnameInarry,
        labelledPrice : labelledPrice,
        price : price,
        image : responses,
        description : description,
        stock : stock,
        isAvailable : isAvailable,
        category : category
    }
    console.log(productData)

    if(responses.length == 0){
        productData.image = location.state.image;
    }


    const token =localStorage.getItem("token")

if(token == null){
    window.location.href="/login";
    return 
}

axios.put(import.meta.env.VITE_BACKEND_URL +"/api/products/"+productID,productData,
    {
        headers :{
                Authorization: "Bearer "+token
        }
    }


).then(
    
    (response)=>{

        console.log("Product Update sucessfull..")
        console.log(response.data)
        toast.success("Product Update sucessfully..")
        navigate("/admin/products")

    }

).catch(
    (error)=>{
        console.error("Error Update product :",error)
        toast.error("Product Update unsucessfully..")

    }
)

}




  return (
    <div className='h-full w-full bg-green-400 flex justify-center items-center'>
      <div className='h-[600px] w-[650px] border-2 bg-amber-300 shadow-xl rounded-2xl flex flex-wrap justify-between p-6'>
        
        {/* Product ID */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Product ID</label>
          <input type='text' disabled placeholder='Enter Product ID'  value={productID} onChange={(productID)=>{
            setproductID(productID.target.value)

          }}
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Product Name */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Product Name</label>
          <input type='text' placeholder='Enter Product Name' value={productName} onChange={
            (productName)=>{
                setproductName(productName.target.value)

            }
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Alternative Names */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Alternative Names</label>
          <input type='text' placeholder='Enter alternative names' value={altNames} onChange={
            (altNames)=>{setaltNames(altNames.target.value)}
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Labelled Price */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Labelled Price</label>
          <input type='number' placeholder='Enter labelled price' value={labelledPrice} onChange={
            (labelledPrice)=>{setlabelledPrice(labelledPrice.target.value)}
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Price */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Price</label>
          <input type='number' placeholder='Enter final price' value={price} onChange={
            (price)=>{setprice(price.target.value)}
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Stock */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Stock</label>
          <input type='number' placeholder='Enter stock quantity' value={stock} onChange={
            (stock)=>{setstock(stock.target.value)}
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Availability */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Available</label>
          <select className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500' value={isAvailable}  onChange={
            (isAvailable)=>{setisAvailable(isAvailable.target.value)}
          }
            >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Category */}
        <div className='w-[45%] flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Category</label>
          <input type='text' placeholder='Enter category' value={category} onChange={
            (category)=>{setcategory(category.target.value)}
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Image Upload */}
        <div className='w-full flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Product Image</label>
          <input multiple
          
                 type="file"  
                onChange={(e) => setimage(e.target.files)}
            className='border rounded-lg px-2 py-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500'/>
        </div>

        {/* Description */}
        <div className='w-full flex flex-col gap-[5px]'>
          <label className='text-sm font-semibold'>Description</label>
          <textarea rows='3' placeholder='Enter product description' value={description} onChange={
            (description)=>{setdescription(description.target.value)}
          }
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500'></textarea>
        </div>

        {/* Buttons */}
        <div className='w-full flex justify-center gap-4 mt-4'>
          <button onClick={addProduct} className='bg-green-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-700 transition'>
           Update Product
          </button>
          <Link  to="/admin/products" className='bg-gray-400 text-white px-6 py-2 rounded-xl shadow-md hover:bg-gray-500 transition'>
            Cancel
          </Link>
        </div>

      </div>
    </div>
  )
}



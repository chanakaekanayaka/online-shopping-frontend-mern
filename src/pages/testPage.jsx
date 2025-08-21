import { useState } from "react"; 

import toast from "react-hot-toast";
import uploadfile from "../utils/mediaUpload";





export default function TestPage(){
    const [file,setfile] = useState(null);

    function fileUpload (file){

        uploadfile(file).then(
            (publicurl)=>{
                console.log("Url is :", publicurl)
                toast.success("Sucessfully upload")

            }
        ).catch(
            (error)=>{
                console.error("Error uploading file :"+error)
                toast.error(error);
            }
        )
        

            
        
    }
    

    return(
        <div className="h-full w-screen bg-red-500 flex justify-center items-center" >

            <input multiple type="file" onChange={
                (e)=>{
                    console.log(e)
                    console.log(e.target.files)

                }
            } />

            <button  onClick={fileUpload} className="bg-black text-amber-50 border-amber-300">Submit</button>
            

        </div>

    )

    

}
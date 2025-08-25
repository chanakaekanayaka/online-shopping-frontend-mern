import { useState } from "react"; 

import toast from "react-hot-toast";
import uploadfile from "../utils/mediaUpload";
import Loader from "../components/loader";





export default function TestPage(){
    

    return(
        <div className="h-full w-screen flex justify-center items-center" >

            <Loader></Loader>

        </div>

    )

    

}
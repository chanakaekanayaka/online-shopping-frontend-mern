import { useState } from "react";

export default function ImagesSlider(props){
    const images = props.images;
    const [activeimageIndex,setactiveImageindex] = useState(0);

    return(
        <div className="w-[400px] h-[500px] bg-pink-300">
            <img src={images[activeimageIndex]} className="w-full h-[400px] object-cover cursor-pointer"/>
            <div className="w-full h-[100px] flex flex-row  items-center justify-center gap-[3px] p-y-[3px]">
                {
                    images.map(
                        (images,index)=>{
                            return(
                                <img src={images} key={index} className={"w-[100px] h-[100px] object-cover cursor-pointer" +(activeimageIndex == index && "border-4")}
                                 onClick={
                                    ()=>{
                                        setactiveImageindex(index);
                                    }
                                 }
                                
                                />
                            )
                        }
                    )
                }

            </div>

        </div>
    )
}
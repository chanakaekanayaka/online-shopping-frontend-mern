import { useState } from "react";

export default function ImagesSlider(props) {
  const images = props.images;
  const [activeimageIndex, setactiveImageindex] = useState(0);

  return (
    <div className="w-full max-w-[450px] flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="w-full aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
        <img
          src={images[activeimageIndex]}
          className="w-full h-full object-cover cursor-crosshair hover:scale-105 transition-transform duration-500"
          alt="Product large view"
        />
      </div>

      {/* Thumbnails Row */}
      <div className="w-full flex flex-row items-center justify-start gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              key={index}
              className={
                "w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover cursor-pointer rounded-xl transition-all duration-200 border-2 " +
                (activeimageIndex === index
                  ? "border-blue-500 scale-95 opacity-100 shadow-lg shadow-blue-500/20"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-slate-700")
              }
              onClick={() => {
                setactiveImageindex(index);
              }}
              alt={`Thumbnail ${index}`}
            />
          );
        })}
      </div>
    </div>
  );
}
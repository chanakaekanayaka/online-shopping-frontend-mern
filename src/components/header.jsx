import { Link } from "react-router-dom";

export default function Header(){
    return(
        <div className="h-[100px]  bg-amber-500 flex justify-center items-center ">

            <Link to="/"  className="text-amber-100 text-3xl ">Home</Link>
            <Link to="/reviews"  className="text-amber-100 text-3xl ">Reviews</Link>
            <Link to="/products"  className="text-amber-100 text-3xl ">Product</Link>
            <Link to="/contactus"  className="text-amber-100 text-3xl ">ContactUs</Link>
            <Link to="/aboutus"  className="text-amber-100 text-3xl ">AboutUs</Link>

        </div>
    )
}
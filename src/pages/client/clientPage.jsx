import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import Footer from "../../components/footer";
import ContactUs from "./contactUs"
import HomePage from "../homePage";
import AboutUs from "./aboutUs";





export default function ClientWebPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-950">
      <Header />
      <div className="flex-grow"> 
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/reviews" element={<h1 className="text-white text-3xl p-10">Reviews</h1>} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/aboutUs" element={<AboutUs/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/*" element={<h1 className="text-white text-3xl p-10 text-center">404 NOT FOUND</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  //  Categories 
  const categories = ["Cricket", "Football", "Tennis", "Rugby", "Footwear", "Fitness"];

  useEffect(() => {
    if (isLoading) {
      let url = import.meta.env.VITE_BACKEND_URL + "/api/products";
      
      if (query !== "") {
        url = import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query;
      } else if (selectedCategory !== "All") {
        // Assuming your backend has a category filter endpoint
        url = import.meta.env.VITE_BACKEND_URL + "/api/products/category/" + selectedCategory;
      }

      axios.get(url).then((res) => {
        setProducts(res.data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [isLoading, query, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col">
      
      {/* Search Header */}
      <div className="w-full h-[100px] flex justify-center items-center px-6 sticky top-0 bg-slate-950/90 backdrop-blur-md z-30">
        <input
          className="w-full max-w-[500px] h-[45px] bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-4 focus:border-blue-500 outline-none transition-all shadow-lg"
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLoading(true);
          }}
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row px-4 md:px-8 gap-8">
        
        {/* Sidebar / Category Section */}
        <aside className="w-full lg:w-[250px] shrink-0">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sticky lg:top-[120px]">
            <h2 className="text-xl font-bold mb-6 text-slate-100">Categories</h2>
            
            {/* Mobile: Horizontal Scroll | Desktop: Vertical List */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-3 pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setQuery(""); // Clear search when selecting category
                    setLoading(true);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap text-left
                    ${selectedCategory === cat 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Section */}
        <main className="flex-grow pb-20">
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.productID} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-500 text-lg">No products found in this section.</p>
                </div>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
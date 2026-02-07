import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, [selectedCat]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${selectedCat}&search=${searchTerm}`,
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* SEARCH & DROPDOWN SECTION */}
      <section className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* CATEGORY DROPDOWN */}
          <div className="relative w-full md:w-64">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Category
            </label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none cursor-pointer hover:bg-gray-100 transition"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {/* Custom Arrow Icon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-5 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* SEARCH INPUT */}
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Search Product
            </label>
            <input
              type="text"
              placeholder="What are you looking for? (e.g. T-Shirt, Pizza...)"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* SEARCH BUTTON */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition-all shadow-lg active:scale-95"
            >
              SEARCH
            </button>
          </div>
        </form>
      </section>

      {/* PRODUCTS DISPLAY SECTION */}
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">
          {selectedCat === "all" ? "All Products" : "Filtered Results"}
        </h2>
        <span className="text-gray-500 text-sm font-medium">
          {products.length} Items Found
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="bg-white group rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            {/* Image container */}
            <div className="relative h-52 bg-gray-50 overflow-hidden p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/80 backdrop-blur-md text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase border border-blue-100">
                  {product.category_name}
                </span>
              </div>
            </div>

            {/* Content container */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Official Allstore Product
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block line-through">
                    $1,200
                  </span>
                  <span className="text-xl font-black text-gray-900">
                    $899.00
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents card click when clicking button
                    // Add to cart logic here
                    console.log(`Add to cart: ${product.name}`);
                  }}
                  className="bg-gray-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-bold text-gray-400">
              Oops! No products found in this selection.
            </h3>
            <p className="text-gray-300">
              Try changing your category or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

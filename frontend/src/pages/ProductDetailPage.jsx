import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching product", err);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center py-20">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          {error || "Product not found"}
        </h2>
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          ← Back to Products
        </Link>
      </div>

      {/* Product Detail */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
              {product.category_name}
            </span>

            {/* Product Name */}
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Product ID */}
            <p className="text-gray-500 text-sm mb-6">
              Product ID: {product.id}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-2xl text-gray-400 line-through block mb-2">
                $1,200.00
              </span>
              <span className="text-5xl font-black text-gray-900">$899.00</span>
              <span className="text-green-600 font-semibold ml-4">25% OFF</span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-600">
                Official Allstore Product. High quality guaranteed with 1 year
                warranty.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg active:scale-95">
                Add to Cart
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-8 rounded-lg transition-all">
                ♡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

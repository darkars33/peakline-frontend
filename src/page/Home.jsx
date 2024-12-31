import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Product from "../component/Product";
import AddProduct from "../component/AddProduct";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const productsPerPage = 5;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://peakline-backend.onrender.com/api/products/allProducts");
      console.log("res", res.data);
      setProducts(res.data.data || []);
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  console.log("products", products);

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      fetchProducts();
      return;
    }

    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
    );

    setProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleSort = (type) => {
    const sortedProducts = [...products].sort((a, b) =>
      type === "asc" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
  };

  const toggleAddProduct = () => {
    setIsAddProductVisible(!isAddProductVisible);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full pt-14 p-3 flex justify-center relative">
      <div
        className={`w-[100%] md:w-[80%] mt-10 flex flex-col items-center ${isAddProductVisible ? "opacity-50" : ""
          }`}
      >
        <div className="w-full p-3 flex flex-wrap gap-5 justify-center  md:justify-between items-center shadow-lg">
          <div className="relative w-full">
            <CiSearch className="text-2xl absolute top-1 right-4" />
            <input
              type="text"
              value={search}
              onChange={handleFilter}
              className="p-1 px-5 pr-10 bg-gray-100 focus:outline-none rounded-full w-[100%]"
              placeholder="Search for Product"
            />
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 p-2 bg-slate-700 text-white rounded-lg hover:bg-blue-200"
              onClick={() => handleSort("desc")}
            >
              <FaArrowCircleDown /> Desc
            </button>
            <button
              className="flex items-center gap-2 p-2 bg-slate-700 text-white rounded-lg hover:bg-blue-200"
              onClick={() => handleSort("asc")}
            >
              <FaArrowCircleUp /> Asc
            </button>
            <button
              className="flex items-center gap-2 p-2 bg-slate-700 text-white rounded-lg hover:bg-blue-200"
              onClick={toggleAddProduct}
            >
              <IoMdAdd /> Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <div className="w-full mt-5 h-[75vh] flex items-center justify-center">
            <p>Loading products...</p>
          </div>
        ) : currentProducts.length > 0 ? (
          <div className="w-full mt-5 h-[75vh] overflow-auto scrollbar-hide scroll-m-4">
            {currentProducts.map((product) => (
              <Product
                key={product.id}
                product={product}
                setIsAddProductVisible={setIsAddProductVisible}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            ))}
          </div>
        ) : (
          <div className="w-full mt-5 h-[75vh] flex items-center justify-center">
            <p>No products found</p>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-4">
          <button
            className="p-2 bg-gray-300 rounded-lg"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`p-2 ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
                } rounded-lg`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="p-2 bg-gray-300 rounded-lg"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {isAddProductVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[50%]">
            <AddProduct setRefresh={setRefresh} refresh={refresh} />
            <button
              className="mt-5 bg-red-500 text-white p-2 rounded-lg"
              onClick={toggleAddProduct}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: ''
  });

  const [updating, setUpdating] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://peakline-backend.onrender.com/api/products/product/${id}`);
      console.log('Product fetched:', res.data);
      setProductData(res.data.data); 
    } catch (error) {
      console.log('Error:', error.message);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };


  useEffect(() => {
    fetchProduct();
  }, [id]);

  
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      image: file
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('stock', productData.stock);
    if (productData.image) formData.append('image', productData.image);

    try {
      const res = await axios.put(`https://peakline-backend.onrender.com/api/products/updateProduct/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/product/${id}`);
      }
    } catch (error) {
      console.log('Error:', error.message);
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="pt-16 w-full p-3 flex justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[50%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-5">
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="p-2 w-full border-b-2 border-gray-500 focus:outline-none"
              />
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="Product Category"
                className="p-2 w-full border-b-2 border-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-5">
              <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Product Price"
                className="p-2 w-full border-b-2 border-gray-500 focus:outline-none"
              />
              <input
                type="text"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                placeholder="Product Stock"
                className="p-2 w-full border-b-2 border-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-5">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="p-2"
              />
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="bg-gray-100 focus:outline-none p-2"
                placeholder="Product Description"
              ></textarea>
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300"
            >
              {updating ? 'Updating...' : 'Update Product'}
            </button>
          </form>
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="mt-5 bg-red-500 text-white p-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

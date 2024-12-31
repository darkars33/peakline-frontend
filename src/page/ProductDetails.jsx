import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoImage from '../assets/NoImage.svg';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);

  const handleFetchProduct = async () => {
    try {
      setLoading(true); 
      const res = await axios.get(`https://peakline-backend.onrender.com/api/products/product/${id}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error('Error fetching product:', error.message);
      toast.error('Failed to fetch product details. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleFetchProduct(); 
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 w-full p-3 flex justify-center">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-16 w-full p-3 flex justify-center">
        <p className="text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-16 w-full p-3 flex justify-center">
      <div className="w-[80%] mt-10 p-3 shadow-lg">
        <div className="gap-10 flex justify-center">
          <img src={NoImage} alt="No product image available" className="aspect-square w-[30%] h-[20%]" />
        </div>
        <div className="mt-5 flex flex-col justify-center gap-5 items-center">
          <h1 className="text-2xl font-semibold">Product Name: {product.name}</h1>
          <p className="text-gray-500">Product Description: {product.description}</p>
          <p>Product Category: {product.category}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <h1 className="text-xl font-semibold">Product Price: ${product.price}</h1>
              <p className="text-xl font-semibold">Product Stock: {product.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

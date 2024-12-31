import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddProduct = ({setRefresh, refresh}) => {
   const [productData, setProductData] = useState({
          name:'',
          price:'',
          description:'',
          category:'',
          image:'',
          stock:''
   })
   const [adding, setAdding] = useState(false);

   const handleChange = (e) =>{
          setProductData({...productData, [e.target.name]:e.target.value})
   }

   const handleAddProduct = async(e) =>{
          e.preventDefault();
          console.log(productData);
          setAdding(true);
          try {
                    const res = await axios.post('https://peakline-backend.onrender.com/api/products/addProduct',productData,{withCredentials:true});

                    if(res.data.success){
                              toast.success(res.data.message);
                              setAdding(false);
                              setProductData({
                                        name:'',
                                        price:'',
                                        description:'',
                                        category:'',
                                        image:'',
                                        stock:''
                              })
                              setRefresh(!refresh);
                    }
          } catch (error) {
                    console.log("error", error.message);
                    const errorMessage = error.response?.data?.message || 'Something went wrong';
                    toast.error(errorMessage);
          }
   }

    return (
        <div>
            <form className='flex flex-col gap-5' onSubmit={handleAddProduct}>
                <div className='flex gap-5'>
                    <input
                        type='text'
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                        placeholder='Product Name'
                        className='p-2 w-full border-b-2 border-gray-500 focus:outline-none'
                    />
                    <input
                        type='text'
                        name='category'
                        value={productData.category}
                        onChange={handleChange}
                        placeholder='Product Category'
                        className='p-2 w-full border-b-2 border-gray-500 focus:outline-none'
                    />
                </div>
                <div className='flex gap-5'>
                    <input
                        type='text'
                        name='price'
                        value={productData.price}
                        onChange={handleChange}
                        placeholder='Product Price'
                        className='p-2 w-full border-b-2 border-gray-500 focus:outline-none'
                    />
                    <input
                        type='text'
                        name='stock'
                        value={productData.stock}
                        onChange={handleChange}
                        placeholder='Product Stock'
                        className='p-2 w-full border-b-2 border-gray-500 focus:outline-none'
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <input type='file' />
                    <textarea
                        name='description'
                        value={productData.description}
                        onChange={handleChange}
                        className='bg-gray-100 focus:outline-none p-2'
                        placeholder='Product Description'
                    ></textarea>
                </div>
                <button
                    type='submit'
                    className='p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300'
          
                >
                    {adding ? 'Adding' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;

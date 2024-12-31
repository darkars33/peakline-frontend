import React from 'react'
import NoImage from "../assets/NoImage.svg"
import { useNavigate } from 'react-router-dom'
import { GrView } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';

const Product = ({ product,setRefresh,refresh}) => {

          const navigate = useNavigate()

          const handleDeleteProduct = async (id) =>{
                    try {
                              const res = await axios.delete(`https://peakline-backend.onrender.com/api/products/deleteProduct/${id}`,{withCredentials:true});
                              if(res.data.success){
                                        toast.success(res.data.message);
                                        setRefresh(!refresh)
                              }
                    } catch (error) {
                              console.log("error", error.message);
                              const errorMessage = error.response?.data?.message || 'Something went wrong';
                              toast.error(errorMessage);
                    }
          }

          return (
                    <div className='w-full p-2 flex flex-col md:flex-row gap-10 rounded-lg border-b'>
                              <div className='w-[100%] p-2 md:w-[400px] '>
                                        <img src={product.image || NoImage} alt="" />
                              </div>
                              <div className='p-3 w-full flex flex-col justify-center gap-5'>
                                        <h1 className='text-xl font-semibold'>{product.name}</h1>
                                        <p className='text-gray-500'>{product.description}</p>
                                        <p>{product.category}</p>
                                        <div className='flex flex-wrap gap-5 justify-between items-center'>
                                                  <div className='flex gap-3'>
                                                            <h1 className='text-xl font-semibold'>$ {product.price}</h1>
                                                            <p className='text-xl font-semibold'>Stock: {product.stock}</p>
                                                  </div>
                                                  <div className='flex gap-3'><button className='flex items-center gap-2 p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300' onClick={() => {
                                                            alert(product._id), navigate(`/product/${product._id}`)
                                                  }}> <GrView /> View</button>
                                                            <button className='flex items-center gap-2 p-2 bg-green-400 text-white rounded-lg hover:bg-blue-300' onClick={() => {
                                                                      alert(product._id), navigate(`/update/${product._id}`)
                                                            }}> <RxUpdate /> Update</button>
                                                            <button className='flex items-center gap-2 p-2 bg-red-400 text-white rounded-lg hover:bg-blue-300' onClick={() => {
                                                                      handleDeleteProduct(product._id)
                                                            }}><FaRegTrashCan /> Delete</button></div>
                                        </div>
                              </div>
                    </div>
          )
}

export default Product

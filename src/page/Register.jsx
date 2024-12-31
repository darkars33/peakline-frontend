import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://peakline-backend.onrender.com/api/users/register",
        formData,
        {withCredentials: true}
      );

      const {data, token} = res.data;

      dispatch(setUser({user:data, token}));

      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false); 
        navigate("/");
      }
    } catch (error) {
      console.error("error", error.message);
      const errorMessage = error.response?.formData?.message || "Something went wrong";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 justify-center items-center">
      <h1 className="text-black text-2xl font-medium">React Js Assignment</h1>
      <div className="w-[400px] p-5 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="flex flex-col gap-5 mt-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-200"
            onClick={handleSubmit}
            disabled={loading} 
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        <p className='mt-3'>Already have Account? <span className='text-lg font-bold cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
  );
};

export default Register;

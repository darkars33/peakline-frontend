import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://peakline-backend.onrender.com/api/users/login', formData, {withCredentials: true});

      const {data, token} = res.data;

      if(res.data.success){
        dispatch(setUser({user:data, token}));
        toast.success(res.data.message);
        setLoading(false);
        navigate('/');
      }


    } catch (error) {
      console.log('error', error.message);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
      setLoading(false);
    }
  }


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[400px] p-5 shadow-lg rounded-lg'>
        <h1 className='text-2xl font-semibold'>Welcome Back</h1>
        <div className='flex flex-col gap-5 mt-5'>
          <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder='Username' className='p-2 border border-gray-300 rounded-lg focus:outline-none' />
          <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Password' className='p-2 border border-gray-300 rounded-lg focus:outline-none' />
          <button className='p-2 bg-blue-400 text-white rounded-lg' onClick={handleSubmit}>{loading ? 'loading...': 'Login'}</button>
        </div>
        <p className='mt-3'>Want to create Account? <span className='text-lg font-bold cursor-pointer' onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
  )
}

export default Login

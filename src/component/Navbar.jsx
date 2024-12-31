import React, {useState} from 'react'
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
          const [show, setShow] = useState(false)

          const dispatch = useDispatch();

          const user = useSelector((state) => state.user.user);

          console.log(user)

          const navigate = useNavigate();

          const {username,name} = user;
          
          const firstLetter = username ? username.charAt(0).toUpperCase() : 'G';

          const handleLogout = () => {
                    dispatch(clearUser());
                    navigate('/login');
          }

          return (
                    <div className='fixed w-full bg-gray-100 text-white p-4 flex justify-center shadow-lg z-10'>
                              <div className='w-[95%] flex justify-between'>
                                        <h1 className='text-black text-xl font-semibold'>Product Listing</h1>
                                        <div className='relative'>
                                                  <span className="p-3 px-5 font-bold bg-blue-400 rounded-full cursor-pointer group relative" onClick={() => setShow(!show)}>
                                                            {firstLetter}
                                                  </span>
                                                  <div className={`text-black absolute font-normal z-10 p-4 w-40 top-12 right-0 bg-white shadow-lg rounded-lg flex-col gap-2 ${show ? 'flex' : 'hidden'} `}>
                                                                      <h1 className='text-lg p-2 uppercase'>{name? name: 'Gest'}</h1>
                                                                      <button className='flex items-center gap-2 p-2 hover:bg-red-300 hover:text-white rounded-lg' onClick={handleLogout}>Logout <LuLogOut /></button>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}

export default Navbar

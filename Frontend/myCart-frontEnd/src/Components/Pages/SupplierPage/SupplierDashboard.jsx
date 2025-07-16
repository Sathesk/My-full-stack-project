import React, { useState, useEffect } from 'react';
import './../../../Styles/SupplierDashboard.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectFade, Navigation} from 'swiper/modules';
import { Routes, Route, useNavigate, Navigate , Outlet} from 'react-router-dom';
import UserDetailsForm from '../../Auth/UserDetailsForm';
import AddressDetailsForm from '../../Auth/AddressDetailsForm';
import ProfileForm from '../../Auth/ProfileForm';
import userService from '../../Services/UserService';
import { useAuth } from '../../../Contexts/AuthContext';
import Sidebar from '../../Layout/Sidebar';
import productService from '../../Services/ProductService';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import ProductsForm from '../../Auth/ProductsForm';

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [userId, setUserId] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (currentUser?.username) {
          const userResponse = await userService.getUserByUsername(currentUser.username);
          setProfilePicture(userResponse.data.profilePictureUrl);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserByUserId = async () => {
      try {
        if (currentUser?.username) {
          const userResponse = await userService.getUserByUsername(currentUser.username);
          setUserId(userResponse.data.sellerId);
        }
      } catch (error) {
        console.error('Error fetching sellerId:', error);
      }
    };

    fetchUserByUserId();
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchProductsBySellerId = async () => {
      setLoading(true);
      try{
        const response = await productService.getProductsBySellerId(3);
        setProducts(response.data);
      }catch(error){
        console.error('Error fetching products', error);
      }finally{
        setLoading(false);
      }
    };
    fetchProductsBySellerId();
  }, []);

  return (
    <>
      <div className='d-flex'>
        <Sidebar/>
        <div className='content d-flex flex-column w-100'>
        <nav className='navbar-main d-flex justify-content-between align-items-center p-3 navbar navbar-expand'>
          <span className='sidebar-toggle d-flex align-items-center fs-4'>
            <i className="bi bi-list" data-bs-toggle='collapse' href='#sidebarColl' aria-expanded='true'></i>
          </span>

          <form inline='true' className='ps-w w-75'>
            <div className='input-group-navbar input-group'>
              <input 
                type="text" 
                placeholder='Search' 
                aria-label='Search' 
                className='form-control rounded shadow-sm'
              />
              <button 
                className='btn ms-2 p-2 bg-white rounded shadow-sm' 
                type='submit'
              >
                <i className='bi bi-search'></i>
              </button>
            </div>
          </form>

          <span className='nav-icon cursor-pointer' aria-expanded='true' data-bs-toggle='dropdown'>
            <a className='nav-link dropdown-toggle d-flex align-items-center' aria-expanded='false'>
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  className='avtar img-fluid rounded-circle me-1 mt-2 mb-2' 
                  alt="Profile"
                />
              ) : (
                <div className='avtar-placeholder rounded-circle me-1 mt-2 mb-2 d-flex align-items-center justify-content-center bg-secondary text-white'>
                  {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                </div>
              )}
              <span className='ms-1 hide-elem'>
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </a>
          </span>

          <div className='dropdown dropdown-menu dropdown-menu3 dropdown-menu-end' drop='end' data--bs-popper='static'>
            <a className='dropdown-item'
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#signupModel"
            >
              Add Profile Details 
            </a>
            <a className='dropdown-item'
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#addressModel"
            >
              Add Address Details 
            </a>
            <a className='dropdown-item' type='button' onClick={handleLogout}>
              Logout
            </a>
          </div>
        </nav>
       
        {/* Route-based Content */}
        <div className='p-4'>
          <Outlet/>
        </div>
      
      </div>
      </div>  

      {/* Modals */}
      <div className='modal fade' id='signupModel' tabIndex="-1" aria-labelledby='signupModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='signupModalLabel'>Update Profile</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <UserDetailsForm/>
            </div>
          </div>
        </div>
      </div>
      
      <div className='modal fade' id='addressModel' tabIndex="-1" aria-labelledby='addressModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='addressModalLabel'>Update Address</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <AddressDetailsForm/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierDashboard;
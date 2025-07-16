import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from './../Services/UserService';
import { useAuth } from './../../Contexts/AuthContext';

const Sidebar = () => {

  const { user: currentUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileName, setProfileName] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (currentUser?.username) {
          const userResponse = await userService.getUserByUsername(currentUser.username);
          setProfilePicture(userResponse.data.profilePictureUrl);
          setProfileName(userResponse.data.firstName + ' ' +userResponse.data.lastName);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, [currentUser]);

    
  return (
    <>
      <aside className='sidebar p-5 w-50' id="sidebarColl">
        <span className='sidebar-toggle hide-sidebar d-flex d-lg-none align-items-center fs-4'>
            <i className='bi bi-list' data-bs-toggle='collapse' href='#sidebarColl' aria-expanded='true'></i>
        </span>
        <h1 className="align-middle text-uppercase fw-bold fs-4">MyCart</h1>
        <div className="mt-4 p-3 shadow-sm rounded d-flex align-items-center justify-content-center w-100 gap-2 bg-white">
          <img src={profilePicture} alt="profile-pic" className='avtar rounded-circle me-1 mt-n2 mb-n2'/>
          
          <div className='w-75 d-flex-column gap-0 hide-element'>
            <h3 className='username mb-1'>{profileName}</h3>
          </div>
        </div>

        <ul className='pt-5 w-100'>
          <li className='sidebar-header mb-4'>eCommerce</li>
          <Link to='/supplier/profile' className="sidebar-link" >
            <i className='bi bi-bar-chart'></i>
            <span>Profile</span>
          </Link>
          <li className='sidebar-link' data-bs-toggle="collapse" href="#dashboardMenu" aria-expanded="false">
            <i className='bi bi-list-columns'></i>
            <span>Orders</span>
            <i className='bi bi-arrow-right'></i>
          </li>
          <li className='sidebar-item collapse-list'>
            <ul className='sidebar-dropdown list-unstyled collapse' id="dashboardMenu">
              <li className="sidebar-item"><a href="#" className="sidebar-link p-2 m-0">List</a></li>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>Details</a></li>
            </ul>
          </li>
          <li className='sidebar-link' aria-expanded='false' data-bs-toggle='collapse' href='#products'>
            <i className="bi bi-truck"></i>
            <span>Products</span>
            <i className="bi bi-arrow-right"></i>
          </li>
          <li className='sidebar-item collapse-list'>
            <ul className='sidebar-dropdown list-unstyled collapse' id='products'>
              
              <Link to="/supplier/categories" className="sidebar-link">
                <span>Add Category</span>
              </Link>

              <Link to="/supplier/categoryDetails" className="sidebar-link">
                <span>Category Details</span>
              </Link>

              <Link to="/supplier/productsForm" className="sidebar-link">
                <span>Add Product</span>
              </Link>

              <Link to="/supplier/productDetails" className="sidebar-link">
                <span>Product Details</span>
              </Link>
            </ul>
          </li>
          <li className='sidebar-link' data-bs-toggle='collapse' href="#BuyerMenu" aria-expanded="false">
            <i className="bi bi-wallet2"></i>
            <span>Buyer</span>
            <i className='bi bi-arrow-right'></i>
          </li>
          <li className="sidebar-item collapse-list">
            <ul className='sidebar-dropdown list-unstyled collapse' id='BuyerMenu'>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>Dashboard</a></li>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>Orders</a></li>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>Addresses</a></li>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>Wishlist</a></li>
            </ul>
          </li>
          <li className='sidebar-link'>
            <i className="bi bi-people"></i>
            <span>Customers</span>
          </li>
          <li className='sidebar-link' data-bs-toggle='collapse' href='#Invoices' aria-expanded='false'>
            <i className='bi bi-card-list'></i>
            <span>Invoices</span>
            <i className='bi bi-arrow-right'></i>
          </li>
          <li className='sidebar-item collapse-list'>
            <ul className='sidebar-dropdown list-unstyled collapse' id='Invoices'>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>List</a></li>
              <li className='sidebar-item'><a href="#" className='sidebar-link p-2 m-0'>Details</a></li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar;